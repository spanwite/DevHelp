'use server';

import mongoose from 'mongoose';
import { dbConnect } from '../mongodb';
import Tag, { type TagJson, type TagRaw } from '@/database/models/Tag';
import '@/database/models/User';
import Question, {
  QuestionJson,
  QuestionRaw,
} from '@/database/models/Question';
import TagQuestion from '@/database/models/TagQuestion';
import { UserJson } from '@/database/models/User';

export async function findManyTags({
  page = 1,
  limit = 10,
  query,
  sort,
}: {
  page?: number;
  limit?: number;
  query?: string;
  sort?: string;
}) {
  const skip = (page - 1) * limit;

  const filterQuery: mongoose.QueryFilter<typeof Tag> = {};
  const sortOrder: { [Key in keyof TagRaw]?: mongoose.SortOrder } = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, 'i') } },
      { description: { $regex: new RegExp(query, 'i') } },
    ];
  }

  switch (sort) {
    case 'popular':
      sortOrder.questionsCount = -1;
      break;
    case 'oldest':
      sortOrder.createdAt = 1;
      break;
    case 'name':
      sortOrder.name = 1;
      break;
    default:
      sortOrder.createdAt = -1;
  }

  await dbConnect();

  const tags = await Tag.find(filterQuery)
    .sort(sortOrder)
    .skip(skip)
    .limit(limit);

  const total = await Tag.countDocuments(filterQuery);

  return {
    tags: tags.map((tag) => tag.toObject({ flattenObjectIds: true })),
    hasNextPage: skip + tags.length < total,
  };
}

export async function findQuestionsByTag(
  tagId: string,
  {
    page = 1,
    limit = 10,
    query,
    sort,
  }: {
    page?: number;
    limit?: number;
    query?: string;
    sort?: string;
  }
) {
  const skip = (page - 1) * limit;

  const filterQuery: mongoose.QueryFilter<typeof Question> = {};
  const sortOrder: { [Key in keyof QuestionRaw]?: mongoose.SortOrder } = {};

  switch (sort) {
    case 'popular':
      sortOrder.upvotes = -1;
      break;
    case 'unanswered':
      filterQuery.$and = [{ answers: 0 }];
    default:
      sortOrder.createdAt = -1;
  }

  await dbConnect();

  const questions = await TagQuestion.aggregate<
    Omit<QuestionJson, 'creator'> & {
      creator: Pick<UserJson, '_id' | 'avatar' | 'name'>;
    } & { tags: TagJson[] }
  >([
    { $match: { tagId: new mongoose.Types.ObjectId(tagId) } },
    {
      $lookup: {
        from: 'questions',
        localField: 'questionId',
        foreignField: '_id',
        as: 'questionInfo',
      },
    },
    { $unwind: '$questionInfo' },
    ...(query
      ? [
          {
            $match: {
              $or: [
                { 'questionInfo.title': { $regex: new RegExp(query, 'i') } },
                {
                  'questionInfo.description': {
                    $regex: new RegExp(query, 'i'),
                  },
                },
              ],
            },
          },
        ]
      : []),
    {
      $lookup: {
        from: 'users',
        localField: 'questionInfo.creator',
        foreignField: '_id',
        as: 'creatorInfo',
      },
    },
    { $unwind: '$creatorInfo' },
    {
      $lookup: {
        from: 'tagquestions',
        let: { questionId: '$questionInfo._id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$questionId', '$$questionId'] } } },
          {
            $lookup: {
              from: 'tags',
              localField: 'tagId',
              foreignField: '_id',
              as: 'tagInfo',
            },
          },
          { $unwind: '$tagInfo' },
          { $addFields: { 'tagInfo._id': { $toString: '$tagInfo._id' } } },
          { $replaceRoot: { newRoot: '$tagInfo' } },
        ],
        as: 'tags',
      },
    },
    {
      $addFields: {
        'questionInfo._id': { $toString: '$questionInfo._id' },
        'questionInfo.creator': {
          _id: { $toString: '$creatorInfo._id' },
          name: '$creatorInfo.name',
          avatar: '$creatorInfo.avatar',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ['$questionInfo', { tags: '$tags' }],
        },
      },
    },
    { $sort: sortOrder as any },
  ]);

  const questionsSlice = questions.slice(skip, skip + limit);

  return {
    questions: questionsSlice,
    hasNextPage: skip + questionsSlice.length < questions.length,
  };
}
