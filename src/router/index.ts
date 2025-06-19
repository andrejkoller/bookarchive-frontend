import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import BookView from '@/views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
    },
    {
      path: '/archive/book/:id',
      name: 'book',
      component: BookView,
    },
  ],
})

export default router
