<template>
  <div class="loading-page"
       :class="{'testClass': true}"
       @click="test()">
    <div class="wrap"></div>
  </div>
</template>
<script>
export default {
  name: 'loading-comp',

  data() {
    return {
      isVisible: false
    };
  },

  methods: {
    test() {
      console.log();
    }
  }
};
</script>