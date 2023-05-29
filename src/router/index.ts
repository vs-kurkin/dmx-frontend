import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DMXDesk from '@/views/DMXDesk.vue'
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  { path: '/desk', name: 'desk', component: DMXDesk },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
