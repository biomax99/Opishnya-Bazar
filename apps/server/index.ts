import process from 'node:process'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { productsRouter } from './routes/products'

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
]

const app = new Hono()
  .use(
    '*',
    cors({
      origin: allowedOrigins,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposeHeaders: ['Content-Length', 'Content-Type'],
      credentials: true,
      maxAge: 86400,
    }),
  )
  .get('/health', (c) => {
    return c.json({ status: 'ok', message: 'Server is running' })
  })
  .route('/products', productsRouter)

export type AppType = typeof app

const port = Number(process.env.PORT) || 3000

export default {
  port,
  fetch: app.fetch,
}
