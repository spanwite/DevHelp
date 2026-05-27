import {
  ERROR_CODES,
  ERROR_TYPES,
  ErrorCode,
  type ErrorType,
} from '@/types/error';

export type ErrorDetails = Record<string, unknown>;

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    type: ErrorType = ERROR_TYPES.INTERNAL_SERVER,
    statusCode: number = 500,
    code: ErrorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
    details?: ErrorDetails
  ) {
    super(message);

    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: ErrorDetails) {
    super(
      message,
      ERROR_TYPES.VALIDATION,
      400,
      ERROR_CODES.VALIDATION_ERROR,
      details
    );
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(
      message,
      ERROR_TYPES.AUTHENTICATION,
      401,
      ERROR_CODES.AUTHENTICATION_ERROR
    );
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(
      message,
      ERROR_TYPES.AUTHORIZATION,
      403,
      ERROR_CODES.AUTHORIZATION_ERROR
    );
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', details?: ErrorDetails) {
    super(
      message,
      ERROR_TYPES.NOT_FOUND,
      404,
      ERROR_CODES.NOT_FOUND_ERROR,
      details
    );
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden', details?: ErrorDetails) {
    super(
      message,
      ERROR_TYPES.FORBIDDEN,
      403,
      ERROR_CODES.FORBIDDEN_ERROR,
      details
    );
    this.name = 'ForbiddenError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(
      message,
      ERROR_TYPES.DATABASE,
      500,
      ERROR_CODES.DATABASE_ERROR,
      details
    );
    this.name = 'DatabaseError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(
      message,
      ERROR_TYPES.CONFLICT,
      409,
      ERROR_CODES.CONFLICT_ERROR,
      details
    );
    this.name = 'ConflictError';
  }
}

export class TimeoutError extends AppError {
  constructor(timeout: number, details?: ErrorDetails) {
    super(
      `Request timeout after ${timeout}ms`,
      ERROR_TYPES.INTERNAL_SERVER,
      408,
      ERROR_CODES.TIMEOUT_ERROR,
      { ...details, timeout }
    );
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error', details?: ErrorDetails) {
    super(
      message,
      ERROR_TYPES.INTERNAL_SERVER,
      0,
      ERROR_CODES.NETWORK_ERROR,
      details
    );
    this.name = 'NetworkError';
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    statusCode: number = 500,
    code: ErrorCode = ERROR_CODES.API_ERROR,
    details?: ErrorDetails
  ) {
    super(message, ERROR_TYPES.INTERNAL_SERVER, statusCode, code, details);
    this.name = 'ApiError';
  }
}
