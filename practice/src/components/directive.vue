<template>
  <div>
    <!-- 动态指令参数 -->
    <div v-test-direc:[foo]>151515115</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      foo: 20
    };
  },
  directives: {
    'testDirec': {
      bind (el, binding) {
        console.log(typeof binding.arg);
        // console.log(el);
        // console.log(binding);
        // el.style.fontSize = binding.value + 'px';
        el.style.fontSize = binding.arg + 'px';
      }
    }
  }
};
</script>
<style lang="less" scoped>

</style>
