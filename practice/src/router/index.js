import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
// import { Hash } from 'crypto';
// 路由懒加载
const Topic = () => import('@/components/answer.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/topic',
      name: 'topic',
      component: Topic
    }
  ]
});
