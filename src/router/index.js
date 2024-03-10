import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
    },
    {
      path: '/advancedSearch',
      name: 'advancedSearch',
      component: () => import('../views/AdvancedSearchPage.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryPage.vue')
    },
    {
      path: '/categoryResult',
      name: 'categoryResult',
      component: () => import('../views/CategoryResultPage.vue')
    }
  ]
})

export default router
