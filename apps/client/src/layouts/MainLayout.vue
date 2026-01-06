<script setup lang="ts">
import { useSidebarStore } from '~/stores/sidebar'
import AppSidebar from "~/components/layout/AppSidebar.vue";

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="min-h-screen flex w-full bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200 dark:from-surface-950 dark:via-surface-900 dark:to-surface-800">
    <AppSidebar />

    <div
      class="flex-1 transition-all duration-300"
      :class="{
        'lg:pl-[88px]': !sidebarStore.isExpanded,
        'lg:pl-[256px]': sidebarStore.isExpanded,
      }"
    >
      <main class="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>
