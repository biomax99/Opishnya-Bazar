<script setup lang="ts">
import type { Product } from '~/types/product'
import Card from 'primevue/card'

defineProps<{
  product: Product
}>()
</script>

<template>
  <router-link :to="`/product/${product.id}`" class="block h-full">
    <Card class="h-full rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer">
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="w-full h-48 bg-surface-200 dark:bg-surface-700 rounded-xl flex items-center justify-center overflow-hidden">
            <i class="pi pi-image text-4xl text-surface-400 dark:text-surface-500" />
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-lg font-semibold text-surface-900 dark:text-surface-0 line-clamp-2">
              {{ product.title }}
            </h3>
            <p v-if="product.description" class="text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
              {{ product.description }}
            </p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xl font-bold text-primary-600 dark:text-primary-400">
                {{ product.price }} ₴
              </span>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </router-link>
</template>

