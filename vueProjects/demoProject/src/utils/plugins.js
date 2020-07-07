// import Vue from 'vue';

export default {
  install: (Vue, options) => {
    let name = options.name || '默认名字';
    Vue.prototype.$young = () => {
      console.log(name);
    };
  }
};
