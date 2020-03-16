<template>
  <div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '这是标题'
    };
  },
  render (createElement) {
    return createElement('h1', this.title);
  }
  // render: function (createElement) {
  //   return createElement('h1', this.blogTitle);
  // }
};
</script>
<style lang="less" scoped>

</style>
