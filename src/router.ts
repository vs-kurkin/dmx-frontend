import ControllerPage from '@/pages/ControllerPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import DevicesPage from '@/pages/DevicesPage.vue'
import PlaygroundPage from '@/pages/PlaygroundPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/devices',
      name: 'devices',
      component: DevicesPage,
    },
    {
      path: '/controller',
      name: 'controller',
      component: ControllerPage,
    },
    {
      path: '/playground',
      name: 'playground',
      component: PlaygroundPage,
    },
  ],
})
