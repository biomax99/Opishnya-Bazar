<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { useProduct } from '~/composables/useApi'

const { id } = defineProps<{
  id: string
}>()

const route = useRoute('/product/[id]')
const productId = computed(() => route.params.id)

const { data: product, isLoading, isError } = useProduct(productId)
</script>

<template>
  <div class="w-full gap-8 flex flex-col">
    <Card v-if="isLoading" class="rounded-2xl">
      <template #content>
        <div class="p-20 flex justify-center items-center">
          <ProgressSpinner />
        </div>
      </template>
    </Card>

    <Card v-else-if="isError" class="rounded-2xl">
      <template #content>
        <Message severity="error" :closable="false">
          Помилка завантаження продукту
        </Message>
      </template>
    </Card>

    <template v-else-if="product">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card class="rounded-2xl">
          <template #content>
            <div class="w-full h-96 bg-surface-200 dark:bg-surface-700 rounded-xl flex items-center justify-center overflow-hidden">
              <i class="pi pi-image text-6xl text-surface-400 dark:text-surface-500" />
            </div>
          </template>
        </Card>

        <Card class="rounded-2xl">
          <template #content>
            <div class="flex flex-col gap-6">
              <div>
                <h1 class="text-4xl font-semibold mb-4 text-surface-900 dark:text-surface-0">
                  {{ product.title }}
                </h1>
                <p v-if="product.description" class="text-lg text-surface-600 dark:text-surface-400">
                  {{ product.description }}
                </p>
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                <span class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {{ product.price }} ₴
                </span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </template>
  </div>
</template>

