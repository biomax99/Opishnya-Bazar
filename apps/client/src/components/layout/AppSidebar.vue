<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import { useSidebarStore } from '~/stores/sidebar'
import { useThemeStore } from '~/stores/theme'
import { NAV_ITEMS } from '~/types/navigation'
import SidebarNavItem from './SidebarNavItem.vue'

const sidebarStore = useSidebarStore()
const themeStore = useThemeStore()
const route = useRoute()
const router = useRouter()

const checkMobile = () => {
  sidebarStore.updateMobileState(window.innerWidth < 1024)
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

watch(() => route.path, () => {
  if (sidebarStore.isMobile) {
    sidebarStore.close()
  }
})
</script>

<template>
  <div>
    <Transition name="backdrop">
      <div
        v-if="sidebarStore.isMobile && sidebarStore.isOpen"
        class="fixed inset-0 bg-surface-900/50 dark:bg-surface-950/70 z-40 lg:hidden"
        @click="sidebarStore.close()"
      />
    </Transition>

    <Transition name="sidebar">
      <aside
        v-if="sidebarStore.isMobile && sidebarStore.isOpen"
        class="fixed inset-y-0 left-0 w-[280px] bg-surface-0 dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 z-50 flex flex-col"
      >
        <div class="p-6 border-b border-surface-200 dark:border-surface-700">
          <h2 class="text-xl font-semibold text-surface-900 dark:text-surface-0">
            Опішня Базар
          </h2>
        </div>

        <nav class="flex-1 overflow-y-auto p-4 space-y-2">
          <SidebarNavItem
            v-for="item in NAV_ITEMS"
            :key="item.to"
            :item="item"
          />
        </nav>

        <div class="border-t border-surface-200 dark:border-surface-700 p-4 space-y-2">
          <Button
            text
            rounded
            class="w-full justify-start px-4"
            @click="themeStore.toggleTheme()"
          >
            <i :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-xl" />
            <span class="ml-3 font-medium">
              {{ themeStore.isDark ? 'Світла' : 'Темна' }}
            </span>
          </Button>

          <Button
            text
            rounded
            class="w-full justify-start px-4"
            @click="router.push('/profile')"
          >
            <Avatar icon="pi pi-user" shape="circle" size="small" />
            <span class="ml-3 font-medium">Профіль</span>
          </Button>
        </div>
      </aside>
    </Transition>

    <aside
      v-if="!sidebarStore.isMobile"
      :class="[
        'fixed top-4 left-4 z-50',
        'transition-all duration-300',
        'rounded-2xl shadow-lg backdrop-blur-md',
        'bg-surface-0/95 dark:bg-surface-900/95',
        'border border-surface-200/50 dark:border-surface-700/50',
        'flex flex-col',
        sidebarStore.isExpanded ? 'w-60' : 'w-[72px]',
      ]"
      :style="{ height: 'calc(100vh - 32px)' }"
    >
      <div :class="sidebarStore.isExpanded ? 'p-6 border-b border-surface-200 dark:border-surface-700' : 'p-4 flex justify-center border-b border-surface-200 dark:border-surface-700'">
        <h2
          v-if="sidebarStore.isExpanded"
          class="text-xl font-semibold text-surface-900 dark:text-surface-0"
        >
          Опішня Базар
        </h2>
        <span
          v-else
          class="text-lg font-bold text-surface-900 dark:text-surface-0"
        >
          ОБ
        </span>
      </div>

      <div class="px-2 py-3">
        <Button
          v-tooltip.right="!sidebarStore.isExpanded ? { value: 'Розгорнути меню', showDelay: 300 } : null"
          text
          rounded
          :class="sidebarStore.isExpanded ? 'w-full justify-start px-3' : 'w-12 h-12 mx-auto justify-center'"
          @click="sidebarStore.toggleExpanded()"
        >
          <i
            :class="sidebarStore.isExpanded ? 'pi pi-angle-double-left' : 'pi pi-angle-double-right'"
            class="text-xl"
          />
          <Transition name="fade-slide">
            <span v-if="sidebarStore.isExpanded" class="ml-3 font-medium">
              Згорнути
            </span>
          </Transition>
        </Button>
      </div>

      <nav class="flex-1 overflow-y-auto px-2 space-y-1">
        <SidebarNavItem
          v-for="item in NAV_ITEMS"
          :key="item.to"
          :item="item"
        />
      </nav>

      <div class="border-t border-surface-200 dark:border-surface-700 pt-3 pb-3 px-2 space-y-1">
        <Button
          v-tooltip.right="!sidebarStore.isExpanded ? { value: 'Перемкнути тему', showDelay: 300 } : null"
          text
          rounded
          :class="sidebarStore.isExpanded ? 'w-full justify-start px-4' : 'w-12 h-12 justify-center mx-auto'"
          @click="themeStore.toggleTheme()"
        >
          <i :class="themeStore.isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-xl" />
          <Transition name="fade-slide">
            <span v-if="sidebarStore.isExpanded" class="ml-3 font-medium">
              {{ themeStore.isDark ? 'Світла' : 'Темна' }}
            </span>
          </Transition>
        </Button>

        <Button
          v-tooltip.right="!sidebarStore.isExpanded ? { value: 'Профіль', showDelay: 300 } : null"
          text
          rounded
          :class="sidebarStore.isExpanded ? 'w-full justify-start px-4' : 'w-12 h-12 justify-center mx-auto'"
          @click="router.push('/profile')"
        >
          <Avatar icon="pi pi-user" shape="circle" size="small" />
          <Transition name="fade-slide">
            <span v-if="sidebarStore.isExpanded" class="ml-3 font-medium">Профіль</span>
          </Transition>
        </Button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

.fade-slide-enter-active {
  transition: opacity 250ms ease-in-out 50ms, transform 250ms ease-in-out 50ms;
}

.fade-slide-leave-active {
  transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
