import Vue from 'vue';
import compListData from '../../config/compListData';
import { deepClone } from '../../utils';

const state = {
  compListData: [...compListData],
  currentCompListData: []
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
    // 保证组件渲染时key值唯一
    if (length > 0) {
      target.name = target.name + `-${length + 1}`;
    }
    // todo 判断是否越界
    target.propStyle = propStyle; // 设置样式
    state.currentCompListData.push(target);
  },

  // 设置组件数据
  setCurrentCompData(state, { index, payload }) {
    for (let key in payload) {
      state.currentCompListData[index][key] = payload[key];
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
