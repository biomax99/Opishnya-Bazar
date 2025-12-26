import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '~/views/HomeView.vue'
import LoginView from '~/views/LoginView.vue'
import ProductView from '~/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
  ],
})

export default router

