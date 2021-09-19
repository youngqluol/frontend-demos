<template>
  <div class="test-page">
    <Toast>
      <!-- eslint-disable-next-line -->
      <template v-slot:text>
        slot 文字
      </template>
    </Toast>
    <StyleComp />
  </div>
</template>
<script>
import Toast from '../components/Toast';
import StyleComp from '../components/configComp/styleConfig.vue';

export default {
  components: {
    Toast,
    StyleComp
  },
  data() {
    return {
    };
  },
  beforeCreate() {
    // console.log('test:', this);
  },
  created() {
    // console.log('test:', this.$slots);
  },
  mounted() {
    // console.log('test:', this.$slots);
  }
};
</script>
<style lang="less" scoped>
.test-page {
  font-size: .2rem;
}
</style>