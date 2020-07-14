<template>
  <div></div>
</template>
<script>
import Vue from 'vue';
// 使用插件
import young from '@/utils/plugins';
Vue.use(young, { name: '传过来的名字' });
export default {
  data () {
    return {
      title: '这是标题'
    };
  },
  mounted () {
    this.$young();
  }
};
</script>
<style lang="less" scoped>
</style>
