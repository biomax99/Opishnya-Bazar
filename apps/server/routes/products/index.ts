import { Hono } from 'hono'

export const productsRouter = new Hono()

productsRouter.get('/', (c) => {
  return c.json([
    { id: 1, title: 'Велосипед', price: 2000 },
    { id: 2, title: 'Смартфон', price: 5000 },
  ])
})

productsRouter.post('/', async (c) => {
  const product = await c.req.json()
  return c.json({ id: 3, ...product })
})

productsRouter.get('/:id', (c) => {
  const { id } = c.req.param()
  return c.json({ id, title: 'Приклад продукту', price: 1234 })
})

productsRouter.put('/:id', async (c) => {
  const { id } = c.req.param()
  const product = await c.req.json()
  return c.json({ id, ...product })
})

productsRouter.delete('/:id', (c) => {
  const { id } = c.req.param()
  return c.json({ message: `Продукт ${id} видалено` })
})
