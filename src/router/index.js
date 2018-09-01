import Vue from 'vue'
import Router from 'vue-router'
import MainAddress from '@/components/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainAddress',
      component: MainAddress
    }
  ]
})
