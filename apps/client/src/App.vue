<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import { useThemeStore } from './stores/theme'

const route = useRoute()
const themeStore = useThemeStore()

const currentLayout = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : MainLayout
})

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
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
