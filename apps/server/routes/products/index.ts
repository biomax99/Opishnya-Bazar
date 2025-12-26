import { Hono } from 'hono'
import { validateBody, validateParams } from '~/lib/middleware'
import { productCreateSchema, productIdSchema, productUpdateSchema } from '~/lib/validation'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from './controller'

export const productsRouter = new Hono()

productsRouter.get('/', getProducts)

productsRouter.post(
  '/',
  validateBody(productCreateSchema),
  createProduct,
)

productsRouter.get(
  '/:id',
  validateParams(productIdSchema),
  getProductById,
)

productsRouter.put(
  '/:id',
  validateParams(productIdSchema),
  validateBody(productUpdateSchema),
  updateProduct,
)

productsRouter.delete(
  '/:id',
  validateParams(productIdSchema),
  deleteProduct,
)
