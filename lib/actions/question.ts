'use server';

import mongoose from 'mongoose';
import { dbConnect } from '../mongodb';
import { QuestionFormData } from '../schemas/question';
import Question, { QuestionObject } from '@/database/models/Question';
import { AuthenticationError, NotFoundError } from '../api/errors';
import Tag, { TagDocument } from '@/database/models/Tag';
import TagQuestion from '@/database/models/TagQuestion';
import { auth } from '@/auth';

export async function createQuestion(
  data: QuestionFormData
): Promise<QuestionObject> {
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
): Promise<QuestionObject> {
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

export async function findQuestionById(
  questionId: string
): Promise<(QuestionObject & { tags: string[] }) | null> {
  await dbConnect();

  const question = await Question.findById(questionId);
  if (!question) {
    return null;
  }

  const questionTags = await TagQuestion.find({
    questionId: question._id,
  }).populate<{ tagId: TagDocument }>('tagId');

  return {
    ...question.toObject({ flattenObjectIds: true }),
    tags: questionTags.map((tag) => tag.tagId.name),
  };
}
