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
