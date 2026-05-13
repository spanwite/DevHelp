import { NextResponse, type NextRequest } from 'next/server';
import { AppError } from '@/lib/api/errors';
import { logger } from '@/lib/logger';
import { ERROR_CODES, ERROR_TYPES, type ApiErrorResponse } from '@/types/error';
import { MongooseError } from 'mongoose';

interface ErrorHandlerOptions {
  /** Whether to include error details in the response (useful for development) */
  includeDetails?: boolean;
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
  const { includeDetails = true, requestId } = options;

  if (error instanceof AppError) {
    logger.error('Operational error', error, {
      code: error.code,
      type: error.type,
      requestId,
    });

    const response: ApiErrorResponse = {
      success: false,
      error: {
        type: error.type,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        ...(includeDetails && error.details && { details: error.details }),
        ...(requestId && { requestId }),
      },
    };

    return NextResponse.json(response, {
      status: error.statusCode,
    });
  }

  if (error instanceof MongooseError) {
    logger.error('Database error', error, { requestId });

    const response: ApiErrorResponse = {
      success: false,
      error: {
        type: ERROR_TYPES.DATABASE,
        message: 'A database error occurred',
        code: ERROR_CODES.DATABASE_ERROR,
        statusCode: 500,
        ...(includeDetails && {
          details: { name: error.name, message: error.message },
        }),
        ...(requestId && { requestId }),
      },
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }

  if (error instanceof Error) {
    // Unknown error - log and send generic message
    logger.error('Unhandled error', error, { requestId });

    const isDevelopment = process.env.NODE_ENV === 'development';
    const message = isDevelopment
      ? error.message
      : 'An unexpected error occurred. Please try again later.';

    const response: ApiErrorResponse = {
      success: false,
      error: {
        type: ERROR_TYPES.INTERNAL_SERVER,
        message,
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        statusCode: 500,
        ...(isDevelopment && includeDetails && { stack: error.stack }),
        ...(requestId && { requestId }),
      },
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }

  // Non-Error thrown
  logger.error('Unknown error type thrown', undefined, {
    error: String(error),
    requestId,
  });

  const response: ApiErrorResponse = {
    success: false,
    error: {
      type: ERROR_TYPES.INTERNAL_SERVER,
      message: 'An unexpected error occurred',
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      statusCode: 500,
      ...(requestId && { requestId }),
    },
  };

  return NextResponse.json(response, {
    status: 500,
  });
}

/**
 * Wrapper function for API route handlers to catch and handle errors
 * @example
 * export const GET = withErrorHandler(async (req) => {
 *   // your handler code
 * });
 */
export function withErrorHandler(
  handler: (...args: any[]) => Promise<NextResponse>,
  options: ErrorHandlerOptions = {}
) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error, options);
    }
  };
}
