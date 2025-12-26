import { relations } from 'drizzle-orm'
import { boolean, index, numeric, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { baseTable } from '..'

export const product = pgTable('product', {
  ...baseTable,
  title: text().notNull(),
  description: text(),
  used: boolean().default(false).notNull(),
  price: numeric({ mode: 'number' }).notNull(),
  phone: text().notNull(),
})

export const productPhoto = pgTable(
  'product_photo',
  {
    ...baseTable,
    productId: uuid()
      .notNull()
      .references(() => product.id, { onDelete: 'cascade' }),
    url: text().notNull(),
  },
  table => [index('product_photo_productId_idx').on(table.productId)],
)

export const productRelations = relations(product, ({ many }) => ({
  photos: many(productPhoto),
}))

export const productPhotoRelations = relations(productPhoto, ({ one }) => ({
  product: one(product, {
    fields: [productPhoto.productId],
    references: [product.id],
  }),
}))
