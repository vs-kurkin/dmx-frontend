import DashboardPage from '@/views/DashboardPage.vue'
import DMXControllerPage from '@/views/DMXControllerPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/desk',
      name: 'desk',
      component: DMXControllerPage,
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
  ],
})
