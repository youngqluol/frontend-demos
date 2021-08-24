<template>
  <div>
    <Toast>
      <!-- eslint-disable-next-line -->
      <template v-slot:text>
        slot 文字
      </template>
    </Toast>
  </div>
</template>
<script>
import Toast from '../components/Toast';

export default {
  components: {
    Toast
  },
  data() {
    return {
    };
  },
  beforeCreate() {
    console.log('test:', this);
  },
  created() {
    console.log('test:', this.$slots);
  },
  mounted() {
    console.log('test:', this.$slots);
  }
};
</script>
<style lang="less" scoped>

</style>