import Vue from 'vue';
import Router from 'vue-router';
import Home from '@src/pages/Home';
const Info = () => import('@src/components/Info');
const Test = () => import('@src/pages/test');

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
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

export default router;