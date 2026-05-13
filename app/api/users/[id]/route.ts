import { ValidationError, NotFoundError } from '@/lib/api/errors';
import { logger } from '@/lib/logger';
import User from '@/database/models/User';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/api/errorHandler';

async function handleGET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('User ID is required', { field: 'id' });
  }

  await dbConnect();

  const user = await User.findOne({ username: id }).select('-password').lean();
  if (!user) {
    throw new NotFoundError('User', {
      userId: id,
    });
  }

  logger.info('User retrieved successfully', {
    userId: id,
    method: 'GET',
    url: req.url,
  });

  return NextResponse.json({ data: user, success: true }, { status: 200 });
}

export const GET = withErrorHandler(handleGET);
