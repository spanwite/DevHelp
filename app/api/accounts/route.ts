import { dbConnect } from '@/lib/mongodb';
import { type NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/api/error-handler';
import { logger } from '@/lib/logger';
import { ConflictError } from '@/lib/api/errors';
import { parseJson, parseSchema } from '@/lib/api/validation';
import { formSuccessResponse } from '@/lib/api/response';
import Account from '@/database/models/Account';
import { AccountSchema } from '@/lib/schemas/account';

async function handleGET(request: NextRequest) {
  await dbConnect();

  const data = await Account.find().select('-password -email').lean();

  logger.info('Accounts fetched successfully', {
    method: 'GET',
    url: request.url,
    count: data.length,
  });

  return formSuccessResponse({ data: data });
}

async function handlePOST(request: NextRequest) {
  const body = await parseJson(request);
  const account = await parseSchema(AccountSchema, body);

  await dbConnect();

  const existingAccount = await Account.findOne({
    provider: account.provider,
    providerAccountId: account.providerAccountId,
  });

  if (existingAccount !== null) {
    logger.warn('Attempt to create duplicate account', {
      method: 'POST',
      url: request.url,
      data: {
        username: account.username,
      },
    });
    throw new ConflictError('Account already exists', {
      conflictFields: ['username', 'provider/providerAccountId'],
    });
  }

  const createdAccount = await Account.create(account);

  logger.info('Account created successfully', {
    method: 'POST',
    url: request.url,
    accountId: createdAccount._id.toString(),
  });

  return formSuccessResponse({ data: createdAccount, status: 201 });
}

export const GET = withErrorHandler(handleGET);
export const POST = withErrorHandler(handlePOST);
