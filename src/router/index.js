import Vue from 'vue'
import Router from 'vue-router'
import MainAddress from '@/components/main'
import StudentRiBoDetail from '@/components/ribaodetail';
import mainaddress from '@/components/mainaddress';
Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'mainaddress',
      component: mainaddress,
    
    },
    {
      path: '/RBTongJi',
      name: 'MainAddress',
      component: MainAddress,
    
    },
    {
      path: '/RBdetail',
      name: 'StudentRiBoDetail',
      component: StudentRiBoDetail,
    }
  ],
 
})
