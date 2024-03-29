import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { i18n, setLanguage } from './i18n'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

setLanguage().then(() => {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
})
