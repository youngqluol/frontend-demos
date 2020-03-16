import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
// import { Hash } from 'crypto';
// 路由懒加载
const Topic = () => import('@/components/answer.vue');
const optionsCard = () => import('@/components/optionsCard.vue');
const shopCar = () => import('@/components/shopCar.vue');
const keepAlive = () => import('@/components/keepAlive.vue');
const directive = () => import('@/components/directive.vue');
const createElement = () => import('@/components/createElement.vue');
const plugin = () => import('@/components/plugin.vue');
const filter = () => import('@/components/filter.vue');
const transitionGroup = () => import('@/components/transitionGroup.vue');
const button = () => import('@/components/button.vue');
const ball = () => import('@/components/ball.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/optionsCard'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/topic',
      name: 'topic',
      component: Topic
    },
    {
      path: '/optionsCard',
      name: 'optionsCard',
      component: optionsCard
    },
    {
      path: '/shopCar',
      name: 'shopCar',
      component: shopCar
    },
    {
      path: '/keepAlive',
      name: 'keepAlive',
      component: keepAlive
    },
    {
      path: '/directive',
      name: 'directive',
      component: directive
    },
    {
      path: '/createElement',
      name: 'createElement',
      component: createElement
    },
    {
      path: '/plugin',
      name: 'plugin',
      component: plugin
    },
    {
      path: '/filter/:id',
      name: 'filter',
      component: filter
    },
    {
      path: '/transitionGroup',
      name: 'transitionGroup',
      component: transitionGroup
    },
    {
      path: '/button',
      name: 'button',
      component: button,
      beforeEnter: (to, from, next) => { // 路由拦截： 如果有本地存储则跳转，如果没有则跳转首页
        if (localStorage.getItem('limit_chance')) next();
        else next({path: '/transitionGroup'});
      }
    },
    {
      path: '/ball',
      name: 'ball',
      component: ball
    }
  ]
});
