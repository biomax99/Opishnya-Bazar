import { defineConfig } from 'drizzle-kit'
import { env } from './env'

export default defineConfig({
  out: './drizzle/migrations',
  schema: './drizzle/schemas/*',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
