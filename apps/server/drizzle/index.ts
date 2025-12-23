// import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres'
import { timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { env } from '~/env'

export const db = drizzle(env.DATABASE_URL)

export const baseTable = {
  id: uuid('id').$defaultFn(v7).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}
