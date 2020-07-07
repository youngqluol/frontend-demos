import Vue from 'vue';
import Vuex from 'vuex';
import test1 from './modules/test1.js';
import rank from './modules/rank.js';
// import types from './types'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    test1,
    rank
  }
});
