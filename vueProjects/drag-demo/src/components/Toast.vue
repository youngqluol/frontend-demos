<template>
  <div class="toast-page">
    <slot name="text"
          :text="text">{{ text }}</slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '文字'
    };
  },
  mounted() {
    // console.log('toast:', this.$slots);
  }
};
</script>
<style lang="less" scoped>

</style>
