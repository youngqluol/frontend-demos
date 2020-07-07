import * as types from '@/store/types';

const state = {
  list: []
};

const mutations = {
  [types.vuexTest] (state, arg = null) {
    state.list.push(arg);
    setTimeout(() => {
      console.log(state.list);
    }, 200);
  }
};

const actions = {
  [types.vuexTest1] ({state, commit}, arg = null) { // agu需要声明是什么类型的
    commit(types.vuexTest, arg);
  }
};

export default {
  state,
  mutations,
  actions
};
