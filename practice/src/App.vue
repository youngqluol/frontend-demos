<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import types from '@/store/types' 傻子才会写出这行代码（只有是export default 导出的时候才能这么这么写）
// import * as types from '@/store/types'
import '@/assets/style/common.css';
export default {
  name: 'App',
  data () {
    return {
      list: []
    };
  },

  beforeCreate () {
    // console.log(this.$store)
    // this.$store.commit(types.vuexTest, 1)
    // this.$store.dispatch(types.vuexTest1, 3)
    // console.log(this.$store)
  },

  created () {
    // this.list = this.$store.state.test1.list
    // console.log(this.list)
  }
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
body {
  min-height: 1200px;
  margin: 0;
}
</style>
