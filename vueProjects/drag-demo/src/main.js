import Vue from 'vue';
import router from './router';
import Store from './store';
import App from './App.vue';
import './style/reset.less';
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';
import './utils/registerComp';

Vue.use(elementUI);

new Vue({
  router,
  Store,
  render: h => h(App)
}).$mount('#app');
