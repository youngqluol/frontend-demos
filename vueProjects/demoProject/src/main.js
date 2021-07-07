// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// Vue.config.productionTip = false
import store from '@/store';
import { Button, List, Tab, Tabs } from 'vant';
// 引入全局过滤器
import vueFilter from './utils/filter.js';
vueFilter();
Vue.use(Button);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>',
    render: h => h(App)
});
