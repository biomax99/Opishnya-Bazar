import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const getInitialThemeState = () => {
  if (typeof window === 'undefined')
    return false
  const stored = localStorage.getItem('theme')
  if (stored)
    return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean>(getInitialThemeState())

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  watch(isDark, (value) => {
    localStorage.setItem('theme', value ? 'dark' : 'light')
  })

  return {
    isDark,
    toggleTheme,
  }
})

