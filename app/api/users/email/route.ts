import User from '@/database/models/User';
import { withErrorHandler } from '@/lib/api/error-handler';
import { ValidationError, NotFoundError } from '@/lib/api/errors';
import { formSuccessResponse } from '@/lib/api/response';
import { parseJson, parseSchema } from '@/lib/api/validation';
import { logger } from '@/lib/logger';
import { dbConnect } from '@/lib/mongodb';
import { UserSchema } from '@/lib/schemas/user';
import { NextRequest } from 'next/server';

async function handlePOST(request: NextRequest) {
  const body = await parseJson(request);
  const { email } = await parseSchema(UserSchema.partial(), body);
  if (!email) {
    throw new ValidationError('User email is required', {
      field: 'email',
    });
  }

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User', {
      email,
    });
  }

  logger.info('User retrieved successfully by email', {
    email,
    method: 'GET',
    url: request.url,
  });

  return formSuccessResponse({ data: user });
}

export const POST = withErrorHandler(handlePOST);
