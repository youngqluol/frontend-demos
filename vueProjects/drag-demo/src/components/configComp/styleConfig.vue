<template>
  <div class="style-config-section">
    {{ configData }}
    <el-input-number v-for="item in configName"
                     :key="item"
                     :value="configData[item]"
                     controls-position="right"
                     @change="onConfigDataChange(item, configData[item])"
    ></el-input-number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      configName: ['left', 'top', 'width', 'height']
      // configData: {
      //   left: 0,
      //   top: 0,
      //   width: 0,
      //   height: 0
      // }
    };
  },
  computed: {
    configData: {
      get() {
        return this.$store.state.common.configData;
      }
    }
  },
  watch: {
    // configData: {
    //   handler: function(val) {
    //     console.log(val);
    //   },
    //   deep: true
    // }
  },
  methods: {
    onConfigDataChange(key, value) {
      this.$store.commit('updateConfigData', {key, value});
    }
  }
};
</script>
<style lang="less" scoped>
</style>