import Vue from 'vue';

const vueFilter = () => {
  Vue.filter('vueFilter', function (value) {
    if (value > 999) {
      value = 999;
    }
    return value;
  });
};
export default vueFilter;
