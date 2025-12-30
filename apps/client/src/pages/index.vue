<script setup lang="ts">
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { watchEffect } from 'vue'
import ProductCard from '~/components/ProductCard.vue'
import { useProducts } from '~/composables/useApi'

const { data: products, isLoading, isError, error } = useProducts()
</script>

<template>
  <div class="w-full gap-8 flex flex-col">
    <Card class="mb-8">
      <template #content>
        <div class="text-center">
          <h1 class="text-5xl font-semibold mb-3 text-surface-900 dark:text-surface-0 tracking-tight">
            Оголошення
          </h1>
          <p class="text-lg text-surface-600 dark:text-surface-400">
            Знайдіть те, що шукаєте
          </p>
        </div>
      </template>
    </Card>

    <Card v-if="isLoading">
      <template #content>
        <div class="p-20 flex justify-center items-center">
          <ProgressSpinner />
        </div>
      </template>
    </Card>

    <Card v-else-if="isError">
      <template #content>
        <Message severity="error" :closable="false">
          Помилка завантаження оголошень
        </Message>
      </template>
    </Card>

    <div
      v-else-if="products && products.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <Card v-else>
      <template #content>
        <div class="p-20 text-center text-surface-600 dark:text-surface-400">
          <i class="pi pi-inbox text-6xl mb-6 block opacity-50" />
          <p class="text-xl">
            Оголошень поки немає
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>
