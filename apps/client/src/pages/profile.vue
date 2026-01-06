<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const name = ref('Користувач')
const email = ref('user@example.com')
const phone = ref('')
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <h1 class="text-4xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight">
      Профіль
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="lg:col-span-1">
        <template #content>
          <div class="flex flex-col items-center gap-4 py-6">
            <Avatar
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
              class="w-32 h-32 text-4xl"
            />
            <div class="text-center">
              <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-1">
                {{ name }}
              </h2>
              <p class="text-surface-600 dark:text-surface-400">
                {{ email }}
              </p>
            </div>
            <Button
              label="Змінити аватар"
              text
              icon="pi pi-camera"
              class="mt-2"
            />
          </div>
        </template>
      </Card>

      <Card class="lg:col-span-2">
        <template #title>
          <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            Налаштування
          </h2>
        </template>
        <template #content>
          <form class="flex flex-col gap-6" @submit.prevent>
            <div class="flex flex-col gap-2">
              <label for="name" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Ім'я
              </label>
              <InputText
                id="name"
                v-model="name"
                class="w-full"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="email" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Email
              </label>
              <InputText
                id="email"
                v-model="email"
                type="email"
                class="w-full"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="phone" class="text-sm font-medium text-surface-700 dark:text-surface-300">
                Телефон
              </label>
              <InputText
                id="phone"
                v-model="phone"
                placeholder="+380..."
                class="w-full"
              />
            </div>

            <div class="flex justify-end gap-4 pt-4">
              <Button
                label="Скасувати"
                severity="secondary"
                text
              />
              <Button
                type="submit"
                label="Зберегти зміни"
                icon="pi pi-check"
              />
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>
