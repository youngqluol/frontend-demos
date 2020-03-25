<template>
  <div class="text">
    {{text}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: '自搭vue脚手架'
    }
  },
  mounted() {
      document.title = 'appPage'
  },
}
</script>
<style lang="less" scoped>
  .text {
    color: red;
  }
</style>