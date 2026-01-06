<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight">
        Мої оголошення
      </h1>
      <Button
        label="Створити оголошення"
        icon="pi pi-plus"
        @click="router.push('/create-listing')"
      />
    </div>

    <Card>
      <template #content>
        <div class="p-20 text-center text-surface-600 dark:text-surface-400">
          <i class="pi pi-inbox text-6xl mb-6 block opacity-50" />
          <p class="text-xl mb-4">
            У вас поки немає оголошень
          </p>
          <Button
            label="Створити перше оголошення"
            icon="pi pi-plus-circle"
            @click="router.push('/create-listing')"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
