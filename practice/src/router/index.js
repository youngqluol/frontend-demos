import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
// import Home1 from 'scopedSlots'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
