import type { Context } from 'hono'
import { eq } from 'drizzle-orm'
import * as z from 'zod'
import { db } from '~/drizzle'
import { product } from '~/drizzle/schemas/products'
import { handleError } from '~/lib/api'

export const productCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional().nullable(),
  used: z.boolean().default(false),
  price: z.number().min(0),
  phone: z.string().regex(/^[\d\s\-+()]+$/),
})

export const productUpdateSchema = productCreateSchema.partial()

export const productIdSchema = z.object({
  id: z.uuid(),
})

export type ProductCreateInput = z.infer<typeof productCreateSchema>
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>

export async function getProducts(c: Context) {
  try {
    const products = await db.select().from(product)
    return c.json(products)
  }
  catch (error) {
    return handleError(c, error)
  }
}

export async function getProductById(id: string) {
  const [foundProduct] = await db.select().from(product).where(eq(product.id, id))

  return foundProduct || null
}

export async function createProduct(body: ProductCreateInput) {
  await db.insert(product).values(body)
}

export async function updateProduct(id: string, body: ProductUpdateInput) {
  const [updatedProduct] = await db.update(product).set(body).where(eq(product.id, id)).returning()

  return updatedProduct || null
}

export async function deleteProduct(id: string) {
    const [deletedProduct] = await db
      .delete(product)
      .where(eq(product.id, id))
      .returning()

    return deletedProduct || null
}
