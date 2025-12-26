import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  result?: T
  error?: {
    message: string
    code?: string
    details?: unknown
  }
}

export function successResponse<T>(data: T): ApiResponse<T> {
  return {
    status: 'success',
    result: data,
  }
}

export function errorResponse(message: string, code?: string, details?: unknown): ApiResponse {
  return {
    status: 'error',
    error: {
      message,
      code,
      details,
    },
  }
}

export function handleError(c: Context, error: unknown, status: ContentfulStatusCode = 422) {
  if (error instanceof Error) {
    return c.json(errorResponse(error.message, 'INTERNAL_ERROR'), status)
  }
  return c.json(errorResponse('Невідома помилка', 'UNKNOWN_ERROR'), status)
}
