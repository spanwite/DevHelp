'use server';

import mongoose from 'mongoose';
import { dbConnect } from '../mongodb';
import Tag, { TagRaw } from '@/database/models/Tag';
import '@/database/models/User';

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
