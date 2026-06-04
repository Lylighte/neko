import { createRouter, createWebHistory } from 'vue-router'
import { siteConfig } from '@/data/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'neco',
      redirect: '/lobby',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/lobby',
          name: 'lobby',
          component: () => import('../views/Lobby/LobbyView.vue'),
          meta: { title: siteConfig.name },
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('../views/News/NewsView.vue'),
          meta: { title: `${siteConfig.name} | News` },
        },
        {
          path: '/news/detail/:id',
          name: 'news detail',
          component: () => import('../views/News/NewsDetail.vue'),
          meta: { title: `${siteConfig.name} | Article` },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About/AboutView.vue'),
          meta: { title: `${siteConfig.name} | About` },
        },
        {
          path: '/documents',
          name: 'documents',
          component: () => import('../views/Documents/DocumentsView.vue'),
          meta: { title: `${siteConfig.name} | Docs` },
        },
      ],
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      meta: { title: `${siteConfig.name} | 404` },
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = String(to.meta.title)
  }
  next()
})

export { router }
