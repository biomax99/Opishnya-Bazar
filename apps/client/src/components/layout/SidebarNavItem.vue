<script setup lang="ts">
import { useSidebarStore } from '~/stores/sidebar'
import type { NavItem } from '~/types/navigation'

defineProps<{
  item: NavItem
}>()

const sidebarStore = useSidebarStore()
</script>

<template>
  <div
    v-tooltip.right="!sidebarStore.isExpanded && !sidebarStore.isMobile
      ? { value: item.label, showDelay: 300 }
      : null"
  >
    <router-link
      :to="item.to"
      :exact="item.exact"
      :class="[
        'flex items-center rounded-lg transition-all',
        sidebarStore.isExpanded
          ? 'gap-3 px-4 py-3 justify-start'
          : 'w-12 h-12 justify-center mx-auto hover:scale-105',
        'hover:bg-surface-100 dark:hover:bg-surface-800',
      ]"
      active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
    >
      <i :class="item.icon" class="text-xl" />
      <Transition name="fade-slide">
        <span v-if="sidebarStore.isExpanded" class="font-medium">
          {{ item.label }}
        </span>
      </Transition>
    </router-link>
  </div>
</template>
