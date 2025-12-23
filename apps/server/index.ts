import { Hono } from 'hono'
import { productsRouter } from './routes/products'

const app = new Hono()

app.route('/products', productsRouter)

export default app
