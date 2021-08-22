import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import common from './module/common';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    common
  },
  strict: process.env.NODE_ENV !== 'production', // 生产环境禁止开启严格模式
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
});

export default store;