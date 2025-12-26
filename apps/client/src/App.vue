<script setup lang="ts">
import { watch } from 'vue'
import { RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

watch(
  () => themeStore.isDark,
  (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true },
)
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
