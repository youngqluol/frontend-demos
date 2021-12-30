<template>
  <div id="app">
    <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  beforeCreate() {
    this.$store.dispatch({
      type: 'fetchPageData'
    })
  }
}
</script>

<style lang='stylus'>
 * {
   padding 0;
   margin 0;
   box-sizing border-box;
 }
 a {
   underline: none;
 }
 body {
    background #e6e6e6
    font-size 14px;
  }

  .flex-center {
    display flex;
    justify-content center;
    align-items center;
  }
</style>