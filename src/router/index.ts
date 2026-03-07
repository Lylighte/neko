import { createRouter, createWebHistory } from 'vue-router'

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
          meta: { title: 'USTCraft' },
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('../views/List/ListView.vue'),
          meta: { title: 'USTCraft | 服务器列表' },
        },
        {
          path: '/activity',
          name: 'activity',
          component: () => import('../views/Activity/ActivityView.vue'),
          meta: { title: 'USTCraft | 活动列表' },
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('../views/News/NewsView.vue'),
          meta: { title: 'USTCraft | 新闻' },
        },
        {
          path: '/news/detail/:id',
          name: 'news detail',
          component: () => import('../views/News/NewsDetail.vue'),
          meta: { title: 'USTCraft | 新闻详情' },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/About/AboutView.vue'),
          meta: { title: 'USTCraft | 关于' },
        },
        {
          path: '/documents',
          name: 'documents',
          component: () => import('../views/Documents/DocumentsView.vue'),
          meta: { title: 'USTCraft | 文档' },
        },
      ],
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('../views/Management/ManagementView.vue'),
      meta: { title: 'Neko 管理' },
      children: [
        {
          path: '/management/user',
          name: 'user management',
          component: () => import('../views/Management/Components/UserManagementView.vue'),
          meta: { title: 'USTCraft | 用户管理' },
        },
        {
          path: '/management/club',
          name: 'club management',
          component: () => import('../views/Management/Components/ClubManagementView.vue'),
          meta: { title: 'USTCraft | 社团管理' },
        },
        {
          path: '/management/server',
          name: 'server management',
          component: () => import('../views/Management/Components/ServerManagementView.vue'),
          meta: { title: 'USTCraft | 服务器管理' },
        },
        {
          path: '/management/news',
          name: 'news management',
          component: () => import('../views/Management/Components/NewsManagementView.vue'),
          meta: { title: 'USTCraft | 文章管理' },
        },
        {
          path: '/management/document',
          name: 'document management',
          component: () => import('../views/Management/Components/DocumentManagementView.vue'),
          meta: { title: 'USTCraft | 文档管理' },
        },
      ],
    },
    {
      path: '/documents_editor',
      name: 'documents editor',
      component: () => import('../views/Documents/DocumentsEditor.vue'),
      meta: { title: 'USTCraft | 文档编辑器' },
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('../views/Auth/LoginView.vue'),
      meta: { title: 'USTCraft | 登录' },
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      meta: { title: 'USTCraft | 404' },
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
