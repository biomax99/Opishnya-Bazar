import type { Product, ProductCreate } from '~/types/product'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface ApiResponse<T> {
  status: 'success' | 'error'
  result?: T
  error?: {
    message: string
    code?: string
    details?: unknown
  }
}

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  let response: Response
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Не вдалося підключитися до сервера. Переконайтеся, що сервер запущений.',
        0,
        'Network Error',
      )
    }
    throw error
  }

  if (!response.ok && response.status === 0) {
    throw new ApiError(
      'Не вдалося підключитися до сервера. Переконайтеся, що сервер запущений.',
      0,
      'Network Error',
    )
  }

  let data: ApiResponse<T>
  try {
    data = await response.json()
  } catch (error) {
    throw new ApiError(
      'Не вдалося розпарсити відповідь сервера',
      response.status,
      response.statusText,
    )
  }

  if (data.status === 'error') {
    const errorMessage = data.error?.message || `API Error: ${response.statusText}`
    const statusCode = response.ok ? 500 : response.status
    throw new ApiError(
      errorMessage,
      statusCode,
      response.statusText,
    )
  }

  if (!response.ok) {
    throw new ApiError(
      `API Error: ${response.statusText}`,
      response.status,
      response.statusText,
    )
  }

  if (!data.result) {
    throw new ApiError(
      'Відповідь не містить даних',
      response.status,
      response.statusText,
    )
  }

  return data.result
}

export const apiClient = {
  products: {
    getAll: (): Promise<Product[]> => request<Product[]>('/products'),
    getById: (id: string): Promise<Product> => request<Product>(`/products/${id}`),
    create: (product: ProductCreate): Promise<Product> =>
      request<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(product),
      }),
    update: (id: string, product: Partial<ProductCreate>): Promise<Product> =>
      request<Product>(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      }),
    delete: (id: string): Promise<void> =>
      request<void>(`/products/${id}`, {
        method: 'DELETE',
      }),
  },
}

export { ApiError }

