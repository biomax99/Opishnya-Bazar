import type { MaybeRefOrGetter } from 'vue'
import type { ProductCreate } from '~/types/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import { api } from '~/entities/product/api'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => api.getAll(),
  })
}

export function useProduct(id: MaybeRefOrGetter<string>) {
  const productId = computed(() => toValue(id))

  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getById(productId.value),
    enabled: computed(() => !!productId.value),
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: ProductCreate) => api.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<ProductCreate> }) =>
      api.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
