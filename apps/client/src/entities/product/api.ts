import type { Product, ProductCreate } from './types'
import { http } from '~/lib/api-client'

export const api = {
  getAll: () => http<Product[]>('/products'),
  getById: (id: string) => http<Product>(`/products/${id}`),
  create: (product: ProductCreate) => http<Product>('/products', {
    method: 'POST',
    body: product,
  }),
  update: (id: string, product: Partial<ProductCreate>) => http<Product>(`/products/${id}`, {
    method: 'PUT',
    body: product,
  }),
  delete: (id: string) => http<void>(`/products/${id}`, {
    method: 'DELETE',
  }),
}
