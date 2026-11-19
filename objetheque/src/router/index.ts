import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/catalogue',
    },
    {
      path: '/catalogue',
      name: 'catalog',
      component: () => import('../features/catalog/CatalogPage.vue'),
    },
    {
      path: '/articles/:id',
      name: 'item',
      component: () => import('../features/catalog/ItemPage.vue'),
      props: true,
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('../features/not-found/NotFoundPage.vue')
    // }
  ],
})

export default router
