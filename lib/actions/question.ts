'use server';

import mongoose from 'mongoose';
import { dbConnect } from '../mongodb';
import { QuestionFormData } from '../schemas/question';
import Question, { QuestionObject } from '@/database/models/Question';
import { AuthenticationError } from '../api/errors';
import Tag from '@/database/models/Tag';
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

    return question.toObject();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
