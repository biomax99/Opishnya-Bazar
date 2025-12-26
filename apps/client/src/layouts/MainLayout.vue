<script setup lang="ts">
import AppNavbar from '~/components/layout/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center w-full gap-6 transition-colors bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-950 dark:via-surface-900 dark:to-surface-800">
    <AppNavbar />

    <main class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 flex-1">
      <slot />
    </main>
  </div>
</template>
