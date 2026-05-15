import { NextResponse, type NextRequest } from 'next/server';
import { AppError } from '@/lib/api/errors';
import { logger } from '@/lib/logger';
import { ERROR_CODES, ERROR_TYPES, type ApiErrorResponse } from '@/types/error';
import { MongooseError } from 'mongoose';
import { formErrorResponse } from './response';

interface ErrorHandlerOptions {
  /** Optional request ID for logging correlation */
  requestId?: string;
}

/**
 * Centralized error handling function for API routes
 * @param error - The error to handle
 * @param options - Additional options for error handling
 * @returns NextResponse with standardized error format
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): NextResponse<ApiErrorResponse> {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const { requestId } = options;

  if (error instanceof AppError) {
    logger.error('Operational error', error, {
      code: error.code,
      type: error.type,
      requestId,
    });
    return formErrorResponse({
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      message: error.message,
      details: error.details,
      requestId,
    });
  }

  if (error instanceof MongooseError) {
    logger.error('Database error', error, { requestId });

    return formErrorResponse({
      type: ERROR_TYPES.DATABASE,
      message: 'A database error occurred',
      code: ERROR_CODES.DATABASE_ERROR,
      statusCode: 500,
      details: { name: error.name, message: error.message },
      requestId,
    });
  }

  if (error instanceof Error) {
    // Unknown error - log and send generic message
    logger.error('Unhandled error', error, { requestId });

    const message = isDevelopment
      ? error.message
      : 'An unexpected error occurred. Please try again later.';
    const details = isDevelopment
      ? { name: error.name, message: error.message }
      : undefined;

    return formErrorResponse({
      message,
      details,
      requestId,
    });
  }

  // Non-Error thrown
  logger.error('Unknown error type thrown', undefined, {
    error: String(error),
    requestId,
  });

  return formErrorResponse({ requestId });
}

export type NextApiHandler<Context extends object> = (
  request: NextRequest,
  context: Context
) => Promise<NextResponse>;

/**
 * Wrapper function for API route handlers to catch and handle errors
 * @example
 * export const GET = withErrorHandler(async (req) => {
 *   // your handler code
 * });
 */
export function withErrorHandler<Context extends object>(
  handler: NextApiHandler<Context>,
  options: ErrorHandlerOptions = {}
): NextApiHandler<Context> {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error) {
      const requestId = request.headers.get('x-request-id');
      return handleError(error, {
        ...(requestId ? { requestId } : {}),
        ...options,
      });
    }
  };
}
