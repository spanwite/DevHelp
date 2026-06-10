'use server';

import mongoose from 'mongoose';
import { dbConnect } from '../mongodb';
import { QuestionFormData } from '../schemas/question';
import Question from '@/database/models/Question';
import { AuthenticationError, NotFoundError } from '../api/errors';
import Tag, { TagDocument } from '@/database/models/Tag';
import TagQuestion from '@/database/models/TagQuestion';
import { auth } from '@/auth';
import '@/database/models/User';

export async function createQuestion(data: QuestionFormData) {
  const authSession = await auth();
  const userId = authSession?.user?.id;
  if (!userId) {
    throw new AuthenticationError(
      'You must be signed in to create a question.'
    );
  }

  const { title, description, tags } = data;

  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [question] = await Question.create(
      [
        {
          title,
          description,
          creator: userId,
        },
      ],
      { session }
    );

    for (const tag of tags) {
      const updatedTag = await Tag.findOneAndUpdate(
        { name: tag },
        { $inc: { questionsCount: 1 }, $setOnInsert: { name: tag } },
        { upsert: true, new: true, session }
      );
      await TagQuestion.insertOne(
        {
          questionId: question._id,
          tagId: updatedTag._id,
        },
        { session }
      );
    }

    await session.commitTransaction();

    return question.toObject({ flattenObjectIds: true });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export async function updateQuestionById(
  questionId: string,
  updatedData: QuestionFormData
) {
  const authSession = await auth();
  const userId = authSession?.user?.id;
  if (!userId) {
    throw new AuthenticationError('You must be signed in to edit a question.');
  }

  await dbConnect();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const question = await Question.findByIdAndUpdate(
      questionId,
      updatedData
    ).session(session);
    if (!question) {
      throw new NotFoundError('Question not found.');
    }

    const questionTags: TagDocument[] = await TagQuestion.find({
      questionId: question._id,
    })
      .populate<{ tagId: TagDocument }>('tagId')
      .session(session)
      .then((tags) => tags.map(({ tagId }) => tagId));

    // Add new tags
    for (const tag of updatedData.tags) {
      const tagExists = questionTags.some(({ name }) => name === tag);
      if (tagExists) {
        continue;
      }
      const updatedTag = await Tag.findOneAndUpdate(
        { name: tag },
        { $inc: { questionsCount: 1 }, $setOnInsert: { name: tag } },
        { upsert: true, new: true, session }
      );
      await TagQuestion.insertOne(
        {
          questionId: question._id,
          tagId: updatedTag._id,
        },
        { session }
      );
    }

    // Remove old tags
    for (const tag of questionTags) {
      const tagExists = updatedData.tags.includes(tag.name);
      if (tagExists) {
        continue;
      }
      await Tag.findByIdAndUpdate(tag._id, {
        $inc: { questionsCount: -1 },
      }).session(session);
      await TagQuestion.deleteOne({
        questionId: question._id,
        tagId: tag._id,
      }).session(session);
    }

    await session.commitTransaction();

    return question.toObject({ flattenObjectIds: true });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
}

export async function findQuestionById(questionId: string) {
  await dbConnect();

  const question = await Question.findById(questionId).populate<{
    creator: { _id: string; name: string; avatar: string };
  }>('creator', 'name avatar');
  if (!question) {
    return null;
  }

  const questionTags = await TagQuestion.find({
    questionId: question._id,
  }).populate<{ tagId: TagDocument }>('tagId');

  return {
    ...question.toObject({ flattenObjectIds: true }),
    tags: questionTags.map((tag) =>
      tag.tagId.toObject({ flattenObjectIds: true })
    ),
  };
}

export async function findQuestions({
  page = 1,
  limit = 10,
  query,
  sort,
  filter,
}: {
  page?: number;
  limit?: number;
  query?: string;
  sort?: string;
  filter?: string;
}) {
  const skip = (page - 1) * limit;

  const filterQuery: mongoose.QueryFilter<typeof Question> = {};
  const sortOrder: Record<string, mongoose.SortOrder> = {};

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, 'i') } },
      { description: { $regex: new RegExp(query, 'i') } },
    ];
  }

  switch (filter) {
    case 'popular':
      sortOrder.upvotes = -1;
      break;
    case 'unanswered':
      filterQuery.$and = [{ answers: 0 }];
    case 'newest':
    default:
      sortOrder.createdAt = -1;
  }

  await dbConnect();

  const questions = await Question.find(filterQuery)
    .populate<{
      creator: { _id: string; name: string; avatar: string };
    }>('creator', 'name avatar')
    .sort(sortOrder)
    .skip(skip)
    .limit(limit);

  const questionsWithTags = await Promise.all(
    questions.map(async (question) => {
      const questionTags = await TagQuestion.find({
        questionId: question._id,
      }).populate<{ tagId: TagDocument }>('tagId');
      return {
        ...question.toObject({ flattenObjectIds: true }),
        tags: questionTags.map((tag) =>
          tag.tagId.toObject({ flattenObjectIds: true })
        ),
      };
    })
  );

  const totalQuestions = await Question.countDocuments(filterQuery);

  return {
    questions: questionsWithTags,
    hasNextPage: skip + questions.length < totalQuestions,
  };
}
