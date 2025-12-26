import type { Next } from 'hono'
import type { Context } from 'hono/jsx'
import type * as z from 'zod'
import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import { validateParams } from '~/lib/middleware'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  productCreateSchema,
  productIdSchema,
  productUpdateSchema,
  updateProduct,
} from './service'

export const productsRouter = new Hono()

productsRouter.get('/', getProducts)

productsRouter.post(
  '/',
  sValidator('json', productCreateSchema),
  async (c) => {
    const data = c.req.valid('json')
    await createProduct(data)

    return c.status(201)
  },
)

productsRouter.get(
  '/:id',
  validateParams(productIdSchema),
  getProductById,
)

productsRouter.put(
  '/:id',
  validateParams(productIdSchema),
  sValidator('json', productUpdateSchema),
  async (c) => {
    const id = c.req.param('id')
    const data = c.req.valid('json')
    const product = await updateProduct(id, data)

    if (!product) {
      return c.status(404)
    }

    return c.status(204)
  },
)

productsRouter.delete(
  '/:id',
  validateParams(productIdSchema),
  deleteProduct,
)
