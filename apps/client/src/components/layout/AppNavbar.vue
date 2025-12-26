<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <header class="w-full flex justify-center pt-6 pb-0">
    <div class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <div class="bg-surface-0 dark:bg-surface-900 rounded-2xl shadow-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-2 sm:px-8 sm:py-5 lg:px-8 lg:py-2">
          <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight">
              Опішня Базар
            </h1>
          </router-link>

          <nav class="flex items-center gap-3">
            <Button
              text
              rounded
              class="w-10 h-10 flex items-center justify-center"
              aria-label="Перемкнути тему"
              @click="themeStore.toggleTheme()"
            >
              <i :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg" />
            </Button>
            <Avatar
              icon="pi pi-user"
              shape="circle"
              class="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
