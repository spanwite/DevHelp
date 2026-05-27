import User from '@/database/models/User';
import dbConnect from '@/lib/mongodb';
import { type NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/api/error-handler';
import { logger } from '@/lib/logger';
import { UserSchema } from '@/lib/schemas/user';
import { ConflictError } from '@/lib/api/errors';
import { parseJson, parseSchema } from '@/lib/api/validation';
import { formSuccessResponse } from '@/lib/api/response';

async function handleGET(request: NextRequest) {
  await dbConnect();

  const users = await User.find();

  logger.info('Users fetched successfully', {
    method: 'GET',
    url: request.url,
    count: users.length,
  });

  return formSuccessResponse({ data: users });
}

async function handlePOST(request: NextRequest) {
  const body = await parseJson(request);
  const parsedUser = await parseSchema(UserSchema, body);

  await dbConnect();

  const existingUser = await Promise.all([
    User.findOne({ email: parsedUser.email }),
    User.findOne({ username: parsedUser.username }),
  ]);
  if (existingUser.some((user) => user !== null)) {
    logger.warn('Attempt to create duplicate user', {
      method: 'POST',
      url: request.url,
      data: {
        email: parsedUser.email,
        username: parsedUser.username,
      },
    });
    throw new ConflictError('User already exists', {
      conflictFields: ['email', 'username'],
    });
  }

  const createdUser = await User.create(parsedUser);

  logger.info('User created successfully', {
    method: 'POST',
    url: request.url,
    userId: createdUser._id.toString(),
  });

  return formSuccessResponse({ data: createdUser, status: 201 });
}

export const GET = withErrorHandler(handleGET);
export const POST = withErrorHandler(handlePOST);
