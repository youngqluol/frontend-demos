import Vue from 'vue';
import Router from 'vue-router';
import Home from '@src/pages/Home';
const Info = () => import('@src/components/Info');

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

export default router;