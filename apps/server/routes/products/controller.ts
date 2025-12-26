import type { Context } from 'hono'
import type { ProductCreateInput, ProductUpdateInput } from '~/lib/validation'
import { eq } from 'drizzle-orm'
import { db } from '~/drizzle'
import { product } from '~/drizzle/schemas/products'
import { errorResponse, handleError, successResponse } from '~/lib/api'

export async function getProducts(c: Context) {
  try {
    const products = await db.select().from(product)
    return c.json(successResponse(products))
  }
  catch (error) {
    return handleError(c, error)
  }
}

export async function getProductById(c: Context) {
  try {
    const { id } = c.get('validatedParams') as { id: string }
    const [foundProduct] = await db.select().from(product).where(eq(product.id, id))

    if (!foundProduct) {
      return c.json(errorResponse('Продукт не знайдено', 'NOT_FOUND'), 404)
    }

    return c.json(successResponse(foundProduct))
  }
  catch (error) {
    return handleError(c, error)
  }
}

export async function createProduct(c: Context) {
  try {
    const body = c.get('validatedBody') as ProductCreateInput
    const [newProduct] = await db.insert(product).values(body).returning()

    return c.json(successResponse(newProduct), 201)
  }
  catch (error) {
    return handleError(c, error)
  }
}

export async function updateProduct(c: Context) {
  try {
    const { id } = c.get('validatedParams') as { id: string }
    const body = c.get('validatedBody') as ProductUpdateInput

    const [updatedProduct] = await db
      .update(product)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(product.id, id))
      .returning()

    if (!updatedProduct) {
      return c.json(errorResponse('Продукт не знайдено', 'NOT_FOUND'), 404)
    }

    return c.json(successResponse(updatedProduct))
  }
  catch (error) {
    return handleError(c, error)
  }
}

export async function deleteProduct(c: Context) {
  try {
    const { id } = c.get('validatedParams') as { id: string }
    const [deletedProduct] = await db
      .delete(product)
      .where(eq(product.id, id))
      .returning()

    if (!deletedProduct) {
      return c.json(errorResponse('Продукт не знайдено', 'NOT_FOUND'), 404)
    }

    return c.json(successResponse({ message: 'Продукт успішно видалено' }))
  }
  catch (error) {
    return handleError(c, error)
  }
}
