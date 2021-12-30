import VueRouter from 'vue-router';
import Home from '../pages/home.vue';
import Detail from '../pages/detail.vue'
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/detail',
        component: Detail
    }
]

export default new VueRouter({
    routes
})