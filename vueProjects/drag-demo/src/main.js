import Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';

Vue.config.productionTip = false;
Vue.use(elementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
