export interface Product {
  id: string
  title: string
  description?: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface ProductPhoto {
  id: string
  productId: string
  url: string
  createdAt: string
}

export interface ProductCreate {
  title: string
  description?: string
  price: number
}

