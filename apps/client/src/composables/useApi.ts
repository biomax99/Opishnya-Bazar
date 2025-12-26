import type { ProductCreate } from '~/types/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'
import { apiClient } from '~/lib/api-client'

export function useProducts() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.products.getAll(),
  })

  return {
    data: computed(() => query.data.value ?? []),
    isLoading: computed(() => query.isLoading.value),
    isError: computed(() => query.isError.value),
    error: computed(() => query.error.value),
    refetch: query.refetch,
  }
}

export function useProduct(id: string | (() => string)) {
  const productId = computed(() => (typeof id === 'function' ? id() : id))

  const query = useQuery({
    queryKey: ['product', productId],
    queryFn: () => apiClient.products.getById(productId.value),
    enabled: computed(() => !!productId.value),
  })

  return {
    data: computed(() => query.data.value ?? null),
    isLoading: computed(() => query.isLoading.value),
    isError: computed(() => query.isError.value),
    error: computed(() => query.error.value),
    refetch: query.refetch,
  }
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (product: ProductCreate) => apiClient.products.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return {
    createProduct: mutation.mutate,
    createProductAsync: mutation.mutateAsync,
    isLoading: computed(() => mutation.isPending.value),
    isError: computed(() => mutation.isError.value),
    error: computed(() => mutation.error.value),
    isSuccess: computed(() => mutation.isSuccess.value),
  }
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<ProductCreate> }) =>
      apiClient.products.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })
    },
  })

  return {
    updateProduct: mutation.mutate,
    updateProductAsync: mutation.mutateAsync,
    isLoading: computed(() => mutation.isPending.value),
    isError: computed(() => mutation.isError.value),
    error: computed(() => mutation.error.value),
    isSuccess: computed(() => mutation.isSuccess.value),
  }
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: string) => apiClient.products.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return {
    deleteProduct: mutation.mutate,
    deleteProductAsync: mutation.mutateAsync,
    isLoading: computed(() => mutation.isPending.value),
    isError: computed(() => mutation.isError.value),
    error: computed(() => mutation.error.value),
    isSuccess: computed(() => mutation.isSuccess.value),
  }
}
