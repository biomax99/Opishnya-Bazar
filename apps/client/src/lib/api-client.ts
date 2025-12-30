import { ofetch } from 'ofetch'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const http = ofetch.create({
  baseURL: API_BASE_URL,
})
