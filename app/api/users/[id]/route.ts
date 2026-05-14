import { ValidationError, NotFoundError } from '@/lib/api/errors';
import { logger } from '@/lib/logger';
import User from '@/database/models/User';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/api/error-handler';
import { formSuccessResponse } from '@/lib/api/response';
import { parseJson, parseSchema } from '@/lib/api/validation';
import { UserSchema } from '@/lib/schemas/user';

async function handleGET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('User ID is required', { field: 'id' });
  }

  await dbConnect();

  const user = await User.findById(id).select('-password').lean();
  if (!user) {
    throw new NotFoundError('User', {
      userId: id,
    });
  }

  logger.info('User retrieved successfully', {
    userId: id,
    method: 'GET',
    url: request.url,
  });

  return NextResponse.json({ data: user, success: true }, { status: 200 });
}

async function handleDELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('User ID is required', { field: 'id' });
  }

  await dbConnect();

  const deletedUser = await User.findByIdAndDelete(id).select('-password');
  if (!deletedUser) {
    throw new NotFoundError('User', {
      userId: id,
    });
  }

  logger.info('User deleted successfully', {
    userId: id,
    method: 'DELETE',
    url: request.url,
  });

  return formSuccessResponse({ data: deletedUser });
}

async function handlePUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('User ID is required', { field: 'id' });
  }
  const body = await parseJson(request);
  const validatedData = await parseSchema(UserSchema.partial(), body);

  await dbConnect();

  const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
    new: true,
  }).select('-password');
  if (!updatedUser) {
    throw new NotFoundError('User', {
      userId: id,
    });
  }

  logger.info('User updated successfully', {
    userId: id,
    method: 'PUT',
    url: request.url,
  });

  return formSuccessResponse({ data: updatedUser });
}

export const GET = withErrorHandler(handleGET);
export const DELETE = withErrorHandler(handleDELETE);
export const PUT = withErrorHandler(handlePUT);
