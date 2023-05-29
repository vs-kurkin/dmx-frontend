<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import DMXDesk from '@/views/DMXDesk.vue';
import Root from '@/views/Root.vue';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/desk',
      name: 'desk',
      component: DMXDesk
    }
  ]
})
=======
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
>>>>>>> bc90574 (Init)
