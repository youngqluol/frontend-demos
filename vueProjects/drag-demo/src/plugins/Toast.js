import Vue from 'vue';
import Toast from '../components/Toast.vue';

const Ctor = Vue.extend(Toast);
const instance = new Ctor({
  el: document.createElement('div')
});

export default {
  install(Vue, options = {}) {
    Vue.prototype.$toast = instance;
  }
};