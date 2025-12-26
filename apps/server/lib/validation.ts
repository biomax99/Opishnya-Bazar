import { z } from 'zod'

export const productCreateSchema = z.object({
  title: z.string().min(1, 'Назва обов\'язкова').max(200, 'Назва занадто довга'),
  description: z.string().max(5000, 'Опис занадто довгий').optional().nullable(),
  used: z.boolean().default(false),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Невірний формат ціни'),
  phone: z.string().regex(/^[\d\s\-+()]+$/, 'Невірний формат телефону'),
})

export const productUpdateSchema = productCreateSchema.partial()

export const productIdSchema = z.object({
  id: z.string().uuid('Невірний формат ID'),
})

export type ProductCreateInput = z.infer<typeof productCreateSchema>
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>
