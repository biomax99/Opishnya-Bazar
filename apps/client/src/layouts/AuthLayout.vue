<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center w-full transition-colors bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-950 dark:via-surface-900 dark:to-surface-800">
    <div class="absolute top-6 right-6">
      <Button
        text
        rounded
        class="w-10 h-10 flex items-center justify-center"
        aria-label="Перемкнути тему"
        @click="themeStore.toggleTheme()"
      >
        <i :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg" />
      </Button>
    </div>

    <div class="w-full max-w-md px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-semibold text-surface-900 dark:text-surface-0 tracking-tight mb-2">
          Опішня Базар
        </h1>
      </div>

      <slot />
    </div>
  </div>
</template>
