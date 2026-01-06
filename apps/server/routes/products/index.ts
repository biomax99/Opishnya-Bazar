import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
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
  .get('/', getProducts)
  .post(
    '/',
    sValidator('json', productCreateSchema),
    async (c) => {

      const data = c.req.valid('json')
      await createProduct(data)

      return c.status(201)
    },
  )
  .get(
    '/:id',
    async (c) => {
      const id = c.req.param('id')
      const product = await getProductById(id)

      return c.json(product || [])
    },
  )
  .put(
    '/:id',
    sValidator('query', productIdSchema),
    sValidator('json', productUpdateSchema),
    async (c) => {
      const query = c.req.valid('query')
      const data = c.req.valid('json')
      const product = await updateProduct(query.id, data)

      if (!product) {
        return c.status(404)
      }

      return c.status(204)
    },
  )
  .delete(
    '/:id',
    sValidator('query', productIdSchema),
    async (c) => {
      const query = c.req.valid('query')
      const product = await deleteProduct(query.id)

      if (!product) {
        return c.status(404)
      }

      return c.json(204)
    },
  )
