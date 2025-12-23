import * as process from 'node:process'
import * as z from 'zod'

export const env = z.object({
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
}).parse(process.env)
