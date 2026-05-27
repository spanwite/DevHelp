export const ERROR_TYPES = {
  VALIDATION: 'VALIDATION',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  DATABASE: 'DATABASE',
  EXTERNAL_SERVICE: 'EXTERNAL_SERVICE',
  INTERNAL_SERVER: 'INTERNAL_SERVER',
  FORBIDDEN: 'FORBIDDEN',
} as const;
export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
} as const;
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ApiErrorResponse {
  success: false;
  error: {
    type: ErrorType;
    message: string;
    code: ErrorCode;
    statusCode: number;
    details?: Record<string, unknown>;
    requestId?: string;
  };
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
