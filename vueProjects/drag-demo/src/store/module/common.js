import Vue from 'vue';
import compListData from '../../config/compListData';
import { deepClone } from '../../utils';

const state = {
  compListData: [...compListData],
  currentCompListData: [],
  currentCompIndex: null, // 当前点击的组件索引
  newestCompIndex: null // 最新添加的组件索引
};

const getters = {};

const mutations = {
  setVuexState(state, param) {
    for (let key in param) {
      Vue.set(state, key, param[key]);
    }
  },

  addComp(state, { index, propStyle = {} }) {
    const length = state.currentCompListData.filter(
      item => state.compListData[index].component === item.component
    ).length;
    let target = deepClone(state.compListData[index]);
    console.log('length', length);
    // 保证组件渲染时key值及样式名唯一
    if (length > 0) {
      target.name += `-${length + 1}`;
      target.compClass += `-${length + 1}`;
    }
    target.propStyle = propStyle; // 设置样式
    state.currentCompListData.push(target);
  },

  // 设置组件数据
  setCurrentCompData(state, { payload, index }) {
    for (let key in payload) {
      state.currentCompListData[index][key] = {
        ...state.currentCompListData[index][key],
        ...payload[key]
      };
    }
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
