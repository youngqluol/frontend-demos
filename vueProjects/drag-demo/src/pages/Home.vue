<template>
  <div class="page-home">
    <hello-world></hello-world>
    <button @click="jump">跳转信息页</button>
  </div>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
    };
  },
  methods: {
    jump() {
      this.$router.push({name: 'info'});
    }
  }
};
</script>
<style lang="less" scoped>
  
</style>