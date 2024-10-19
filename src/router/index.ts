import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'
import type { LoginUser } from '@/types/api'


// 客户端类型判断
const client =
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ) || window.innerWidth < 768
    ? 'mobile'
    : 'pc'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/notes',
      component: () => import(`@/views/${client}/Home.vue`),
      beforeEnter: async (to) => {
        const userStore = useUserStore()
        const user = ref<LoginUser | null>(null)
        const initUser = () => {
          if (userStore.user) {
            user.value = userStore.user
            return
          } else {
            router.push({
              name: 'login',
              params: {
                redirect: to.fullPath
              }
            })
          }
        }
        initUser()
      },
      children: [
        {
          path: 'notes',
          name: 'notes',
          component: () => import(`@/views/${client}/Notes.vue`)
        },
        {
          path: 'reviews',
          name: 'reviews',
          component: () => import(`@/views/${client}/Reviews.vue`)
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import(`@/views/${client}/Favorites.vue`)
        },
        {
          path: 'following',
          name: 'following',
          component: () => import(`@/views/${client}/Following.vue`)
        },
        {
          path: 'garbages',
          name: 'garbages',
          component: () => import(`@/views/${client}/Garbages.vue`)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(`@/views/Login.vue`),
      props: (route) => ({
        redirect: route.query.redirect || 'home'
      })
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(`@/views/Test.vue`)
    },
    {
      path: '/test1',
      name: 'test1',
      component: () => import(`@/views/TestA.vue`)
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import(`@/views/NotFound.vue`)
    }
  ]
})

export default router
