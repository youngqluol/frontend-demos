<template>
  <div class="page-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  beforeCreate() {
    if(this.$route.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  },
  methods: {
    test() {
    }
  }
};
</script>

<style lang="less" scoped>

</style>
