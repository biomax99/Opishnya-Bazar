import { defineStore } from 'pinia'
import { ref } from 'vue'

const getInitialExpandedState = () => {
  if (typeof window === 'undefined')
    return true
  const stored = localStorage.getItem('sidebar-expanded')
  return stored ? stored === 'true' : true
}

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)
  const isMobile = ref(false)
  const isExpanded = ref<boolean>(getInitialExpandedState())

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function close() {
    isOpen.value = false
  }

  function open() {
    isOpen.value = true
  }

  function updateMobileState(mobile: boolean) {
    isMobile.value = mobile
  }

  function toggleExpanded() {
    isExpanded.value = !isExpanded.value
    localStorage.setItem('sidebar-expanded', String(isExpanded.value))
  }

  function setExpanded(value: boolean) {
    isExpanded.value = value
    localStorage.setItem('sidebar-expanded', String(value))
  }

  return {
    isOpen,
    isMobile,
    isExpanded,
    toggle,
    close,
    open,
    updateMobileState,
    toggleExpanded,
    setExpanded,
  }
})
