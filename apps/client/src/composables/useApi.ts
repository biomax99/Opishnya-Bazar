import type { InferRequestType } from 'hono/client'
import type { MaybeRefOrGetter } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toValue } from 'vue'
import { api } from '~/lib/api'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.products.$get().then(res => res.json()),
  })
}

export function useProduct(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.products[':id'].$get({ param: { id: toValue(id) } }).then(res => res.json()),
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: InferRequestType<typeof api.products.$post>) => api.products.$post(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: InferRequestType<typeof api.products[':id']['$put']>) =>
      api.products[':id'].$put(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.query.id] })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: InferRequestType<typeof api.products[':id']['$delete']>) =>
      api.products[':id'].$delete(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', variables.query.id] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
