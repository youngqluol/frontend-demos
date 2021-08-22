import Vue from 'vue';
// import Text from '../components/Text.vue';
import compListData from '../config/compListData'; // 组件数据

compListData.forEach(item => {
  Vue.component(item.component, require(`../components/${item.name}`).default);
});