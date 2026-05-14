import {
  ApiErrorResponse,
  ApiSuccessResponse,
  ERROR_CODES,
  ERROR_TYPES,
  ErrorCode,
  ErrorType,
} from '@/types/error';
import { NextResponse } from 'next/server';
import { ErrorDetails } from './errors';

interface FormErrorResponseParams {
  /**
   * Human-readable error message for client display
   * @default 'An unexpected error occurred'
   */
  message?: string;

  /**
   * Application-specific error type for categorization
   * @default 'INTERNAL_SERVER'
   */
  type?: ErrorType;

  /**
   * Application-specific error code for client handling
   * @default 'INTERNAL_SERVER_ERROR'
   */
  code?: ErrorCode;

  /**
   * HTTP status code for error response
   * @default 500
   */
  statusCode?: number;

  details?: ErrorDetails;

  /**
   *  Request ID for logging correlation
   */
  requestId?: string;
}

interface FormErrorResponseOptions {
  /**
   * Whether to include error details in the response (useful for development)
   * @default process.env.NODE_ENV === 'development'
   */
  includeDetails?: boolean;
}

const defaultErrorResponseParams = {
  message: 'An unexpected error occurred',
  type: ERROR_TYPES.INTERNAL_SERVER,
  code: ERROR_CODES.INTERNAL_SERVER_ERROR,
  statusCode: 500,
};

const defaultErrorResponseOptions = {
  includeDetails: process.env.NODE_ENV === 'development',
};

export function formErrorResponse(
  params: FormErrorResponseParams = {},
  options: FormErrorResponseOptions = {}
) {
  const { includeDetails } = {
    ...defaultErrorResponseOptions,
    ...options,
  };
  const { code, message, statusCode, type, details, requestId } = {
    ...defaultErrorResponseParams,
    ...params,
  };
  console.log(params);
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        message,
        type,
        code,
        statusCode,
        details: includeDetails ? details : undefined,
        requestId,
      },
    },
    { status: statusCode }
  );
}

export function formSuccessResponse<T>({
  data,
  status = 200,
}: {
  data: T;
  status?: number;
}) {
  return NextResponse.json<ApiSuccessResponse<T>>(
    {
      success: true,
      data,
    },
    { status }
  );
}
