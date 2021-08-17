<template>
  <div class="text-wrapper"
       :style="computedStyle"
       @click="test()">
    <div class="text">{{ text }}</div>
  </div>
</template>
<script>
export default {
  name: 'text-comp',

  props: {
    text: {
      type: String,
      default() {
        return '文字';
      }
    },

    propStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      isVisible: false
    };
  },

  computed: {
    computedStyle() {
      return {
        width: '1rem',
        height: '0.2rem',
        color: 'red',
        top: 0,
        left: 0,
        zIndex: 0,
        ...this.propStyle
      };
    }
  },

  methods: {
    test() {
      // console.log(1);
    }
  }
};
</script>
<style lang="less" scoped>
  .text-wrapper {
    position: absolute;
    border: 1px solid gray;

    .text {
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
</style>