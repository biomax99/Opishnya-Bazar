import { Hono } from 'hono'
import { productsRouter } from './routes/products'
import { db } from './drizzle'
import { sql } from 'drizzle-orm'

const app = new Hono()

app.get('/',async(c) => {
  return c.json(await db.execute(sql`SELECT * FROM products`))
})

app.route('/products', productsRouter)

export default app
