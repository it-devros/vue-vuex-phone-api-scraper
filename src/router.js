import Vue from 'vue'
import Router from 'vue-router'

import { routes as Home } from '@/scenes/home'

import NotFound from '@/scenes/notFoundPage.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  linkActiveClass: 'active'
})

router.addRoutes([
  Home
])

export default router
