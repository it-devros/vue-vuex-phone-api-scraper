import store from '@/store'
import HomeLayout from '@/layouts/homeLayout.vue'

import storeModule from './store'

const Home = () => import('./containers/home.vue')

export default {
  path: '/',
  component: HomeLayout,
  beforeEnter (to, from, next) {
    if (!store.state.home) {
      store.registerModule('home', storeModule)
    }
    next()
  },
  children: [
    {
      path: '',
      name: 'Home',
      component: Home
    }
  ]
}
