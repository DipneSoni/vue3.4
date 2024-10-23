import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/Auth/ForgotPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: () => import('../views/Auth/ResetPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/posts/index',
      name: 'PostIndex',
      component: () => import('../views/Posts/PostIndex.vue')
    },
    {
      path: '/posts/show/:id',
      name: 'PostShow',
      component: () => import('../views/Posts/PostShow.vue')
    },
    {
      path: '/posts/create',
      name: 'PostCreate',
      component: () => import('../views/Posts/PostCreate.vue'),
      meta: { auth: true }
    },
    {
      path: '/posts/update/:id',
      name: 'PostUpdate',
      component: () => import('../views/Posts/PostUpdate.vue'),
      meta: { auth: true }
    },
    {
      path: '/students',
      name: 'StudentIndex',
      component: () => import('../views/Student/StudentIndex.vue'),
      meta: { auth: true }
    },
    {
      path: '/students/create',
      name: 'StudentCreate',
      component: () => import('../views/Student/StudentCreate.vue'),
      meta: { auth: true }
    },
    {
      path: '/students/:id/edit',
      name: 'StudentEdit',
      component: () => import('../views/Student/StudentEdit.vue'),
      meta: { auth: true }
    }
  ]
})
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  await authStore.getUser()
  if (authStore.user && to.meta.guest) {
    return { name: 'home' }
  }
  if (!authStore.user && to.meta.auth) {
    return { name: 'login' }
  }
})
export default router
