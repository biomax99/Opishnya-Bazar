<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <Card class="rounded-2xl shadow-xl">
      <template #title>
        <div class="text-center mb-6">
          <h1 class="text-3xl font-semibold text-surface-900 dark:text-surface-0 mb-2">
            Вхід
          </h1>
          <p class="text-surface-600 dark:text-surface-400">
            Увійдіть до свого акаунту
          </p>
        </div>
      </template>
      <template #content>
        <form class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              Email
            </label>
            <InputText
              id="email"
              type="email"
              placeholder="your@email.com"
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="password" class="text-sm font-medium text-surface-700 dark:text-surface-300">
              Пароль
            </label>
            <Password
              id="password"
              placeholder="Введіть пароль"
              :feedback="false"
              toggle-mask
              class="w-full"
            />
          </div>
          <Button
            type="submit"
            label="Увійти"
            class="w-full mt-4"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

