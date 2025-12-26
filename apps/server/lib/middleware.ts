import type { Context, Next } from 'hono'
import { z } from 'zod'
import { errorResponse } from './api'

export function validateBody(schema: z.ZodSchema) {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json()
      const validated = schema.parse(body)
      c.set('validatedBody', validated)
      await next()
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        return c.json(
          errorResponse('Помилка валідації', 'VALIDATION_ERROR', error.issues),
          400,
        )
      }
      return c.json(errorResponse('Помилка обробки запиту', 'PARSE_ERROR'), 400)
    }
  }
}

export function validateParams(schema: z.ZodSchema) {
  return async (c: Context, next: Next) => {
    try {
      const params = c.req.param()
      const validated = schema.parse(params)
      c.set('validatedParams', validated)
      await next()
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        return c.json(
          errorResponse('Помилка валідації параметрів', 'VALIDATION_ERROR', error.issues),
          400,
        )
      }
      return c.json(errorResponse('Помилка обробки параметрів', 'PARSE_ERROR'), 400)
    }
  }
}
