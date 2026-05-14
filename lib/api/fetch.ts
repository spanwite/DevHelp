import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  TimeoutError,
  NetworkError,
  ApiError,
  ConflictError,
} from './errors';
import { logger } from '@/lib/logger';
import { ApiSuccessResponse, ERROR_CODES, ERROR_TYPES } from '@/types/error';

/**
 * Generate a unique request ID
 */
function generateRequestId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/** Configuration options for fetch wrapper */
export interface FetchOptions extends RequestInit {
  /**
   * Timeout in milliseconds
   * @default 30000
   */
  timeout?: number;
  /** Custom headers to merge with default headers */
  headers?: Record<string, string>;
  /**
   * Skip logging
   * @default false
   */
  skipLog?: boolean;
  /** Request ID for correlation logging */
  requestId?: string;
}

const DEFAULT_CONFIG = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Wraps native fetch with AbortController for timeout, header configuration,
 * error handling, and logging
 *
 * @example
 * const data = await fetchApi('/api/users', {
 *   method: 'GET',
 *   timeout: 10000,
 *   headers: { Authorization: 'Bearer token' },
 * });
 *
 * @example
 * try {
 *   const response = await fetchApi('/api/data', { method: 'POST', body: JSON.stringify({...}) });
 *   const data = await response.json();
 * } catch (error) {
 *   if (error instanceof AuthenticationError) {
 *     // handle auth error
 *   }
 * }
 */
export async function fetchApi(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const {
    timeout = DEFAULT_CONFIG.timeout,
    headers: customHeaders = {},
    skipLog = false,
    requestId = generateRequestId(),
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const mergedHeaders: Record<string, string> = {
    ...DEFAULT_CONFIG.headers,
    ...customHeaders,
    'x-request-id': requestId,
  };

  const logContext = {
    url,
    method: fetchOptions.method || 'GET',
    timeout,
    requestId,
  };

  try {
    if (!skipLog) {
      logger.debug('Fetch request started', logContext);
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers: mergedHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorData: any = {};

      try {
        if (contentType?.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }
      } catch {
        errorData = { message: 'Failed to parse error response' };
      }

      const errorMessage = errorData?.message || `HTTP ${response.status}`;
      const errorCode = errorData?.code || ERROR_CODES.API_ERROR;

      logger.error('API request failed', new Error(errorMessage), {
        ...logContext,
        statusCode: response.status,
        errorCode,
        details: errorData?.details,
      });

      // Map HTTP status codes to specific error types
      switch (response.status) {
        case 401:
          throw new AuthenticationError(errorMessage);
        case 403:
          throw new AuthorizationError(errorMessage);
        case 404:
          throw new NotFoundError('Resource', { url });
        case 400:
          throw new AppError(
            errorMessage,
            ERROR_TYPES.VALIDATION,
            400,
            ERROR_CODES.VALIDATION_ERROR,
            errorData?.details
          );
        case 409:
          throw new ConflictError(errorMessage, errorData?.details);
        case 500:
        case 502:
        case 503:
        case 504:
          throw new ApiError(
            errorMessage || 'Server error',
            response.status,
            errorCode
          );
        default:
          throw new ApiError(
            errorMessage,
            response.status,
            errorCode,
            errorData?.details
          );
      }
    }

    if (!skipLog) {
      logger.debug('Fetch request completed', {
        ...logContext,
        statusCode: response.status,
      });
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort/timeout
    if (error instanceof DOMException && error.name === 'AbortError') {
      const timeoutError = new TimeoutError(timeout, { url });

      logger.error('Fetch request timeout', timeoutError, {
        ...logContext,
        timeout,
      });

      throw timeoutError;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      const networkError = new NetworkError(error.message || 'Network error', {
        originalError: error.message,
      });

      logger.error('Network error during fetch', networkError, logContext);

      throw networkError;
    }

    // Re-throw AppError instances
    if (error instanceof AppError) {
      throw error;
    }

    // Handle unexpected errors
    const unexpectedError = new AppError(
      error instanceof Error ? error.message : 'Unknown fetch error',
      ERROR_TYPES.INTERNAL_SERVER,
      500,
      ERROR_CODES.INTERNAL_SERVER_ERROR
    );

    logger.error('Unexpected error during fetch', error as Error, logContext);

    throw unexpectedError;
  }
}

/** Convenience wrapper for GET requests */
export async function fetchApiGet<T = unknown>(
  url: string,
  options?: FetchOptions
): Promise<ApiSuccessResponse<T>> {
  const response = await fetchApi(url, { ...options, method: 'GET' });
  return response.json();
}

/** Convenience wrapper for POST requests */
export async function fetchApiPost<T = unknown>(
  url: string,
  body?: unknown,
  options?: FetchOptions
): Promise<ApiSuccessResponse<T>> {
  const response = await fetchApi(url, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json();
}

/** Convenience wrapper for PUT requests */
export async function fetchApiPut<T = unknown>(
  url: string,
  body?: unknown,
  options?: FetchOptions
): Promise<ApiSuccessResponse<T>> {
  const response = await fetchApi(url, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json();
}

/** Convenience wrapper for PATCH requests */
export async function fetchApiPatch<T = unknown>(
  url: string,
  body?: unknown,
  options?: FetchOptions
): Promise<ApiSuccessResponse<T>> {
  const response = await fetchApi(url, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json();
}

/** Convenience wrapper for DELETE requests */
export async function fetchApiDelete<T = unknown>(
  url: string,
  options?: FetchOptions
): Promise<ApiSuccessResponse<T>> {
  const response = await fetchApi(url, { ...options, method: 'DELETE' });
  return response.json();
}
