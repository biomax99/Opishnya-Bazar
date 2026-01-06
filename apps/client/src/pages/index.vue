<script setup lang="ts">
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import ProductCard from '~/components/ProductCard.vue'
import { useProducts } from '~/composables/useApi'

const { data: products, isLoading, isError } = useProducts()
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <h1 class="text-4xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight">
      Каталог оголошень
    </h1>

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
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
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
