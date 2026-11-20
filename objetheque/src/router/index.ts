import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "{ name: 'catalog' }",
    },
    {
      path: '/catalogue',
      name: 'catalog',
      component: () => import('../features/catalog/CatalogPage.vue'),
    },
    {
      path: '/objets/:id',
      name: 'item',
      component: () => import('../features/catalog/ItemPage.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../shared/pages/NotFound.vue'),
    },
  ],
})

export default router
