import Account from '@/database/models/Account';
import { withErrorHandler } from '@/lib/api/error-handler';
import { ValidationError, NotFoundError } from '@/lib/api/errors';
import { formSuccessResponse } from '@/lib/api/response';
import { parseJson, parseSchema } from '@/lib/api/validation';
import { logger } from '@/lib/logger';
import { dbConnect } from '@/lib/mongodb';
import { AccountSchema } from '@/lib/schemas/account';
import { NextRequest } from 'next/server';

async function handlePOST(request: NextRequest) {
  const body = await parseJson(request);
  const { providerAccountId } = await parseSchema(
    AccountSchema.partial(),
    body
  );
  if (!providerAccountId) {
    throw new ValidationError('Provider Account ID is required', {
      field: 'providerAccountId',
    });
  }

  await dbConnect();

  const account = await Account.findOne({ providerAccountId });
  if (!account) {
    throw new NotFoundError('Account', {
      providerAccountId,
    });
  }

  logger.info('Account retrieved successfully by providerAccountId', {
    providerAccountId,
    method: 'GET',
    url: request.url,
  });

  return formSuccessResponse({ data: account });
}

export const POST = withErrorHandler(handlePOST);
