import { ValidationError, NotFoundError } from '@/lib/api/errors';
import { logger } from '@/lib/logger';
import { dbConnect } from '@/lib/mongodb';
import { NextRequest } from 'next/server';
import { withErrorHandler } from '@/lib/api/error-handler';
import { formSuccessResponse } from '@/lib/api/response';
import { parseJson, parseSchema } from '@/lib/api/validation';
import Account from '@/database/models/Account';
import { AccountSchema } from '@/lib/schemas/account';

async function handleGET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('Account ID is required', { field: 'id' });
  }

  await dbConnect();

  const account = await Account.findById(id);
  if (!account) {
    throw new NotFoundError('Account', {
      id,
    });
  }

  logger.info('Account retrieved successfully', {
    id,
    method: 'GET',
    url: request.url,
  });

  return formSuccessResponse({ data: account });
}

async function handleDELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('Account ID is required', { field: 'id' });
  }

  await dbConnect();

  const deletedAccount = await Account.findByIdAndDelete(id);
  if (!deletedAccount) {
    throw new NotFoundError('Account', {
      id,
    });
  }

  logger.info('Account deleted successfully', {
    id,
    method: 'DELETE',
    url: request.url,
  });

  return formSuccessResponse({ data: deletedAccount });
}

async function handlePUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new ValidationError('Account ID is required', { field: 'id' });
  }
  const body = await parseJson(request);
  const validatedData = await parseSchema(AccountSchema.partial(), body);

  await dbConnect();

  const updatedAccount = await Account.findByIdAndUpdate(id, validatedData, {
    new: true,
  });
  if (!updatedAccount) {
    throw new NotFoundError('Account', {
      id,
    });
  }

  logger.info('Account updated successfully', {
    userId: id,
    method: 'PUT',
    url: request.url,
  });

  return formSuccessResponse({ data: updatedAccount });
}

export const GET = withErrorHandler(handleGET);
export const DELETE = withErrorHandler(handleDELETE);
export const PUT = withErrorHandler(handlePUT);
