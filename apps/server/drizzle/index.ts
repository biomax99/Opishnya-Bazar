// import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres'
import { timestamp, uuid } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'
import { env } from '~/env'

export const db = drizzle(env.DATABASE_URL, {
  casing: 'snake_case',
})

export const baseTable = {
  id: uuid().$defaultFn(v7).primaryKey(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}
