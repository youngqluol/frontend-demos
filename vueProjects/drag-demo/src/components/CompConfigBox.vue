<template>
  <div class="comp-config-box">
    <div v-if="isCompEmpty"
         class="empty">请选择组件</div>
    <div v-else>
      <!-- {{ currentCompInfo }} -->
      <section>
        <div v-for="item in compConfigData"
             :key="item.name">
          <el-divider v-if="item.compTag === 'el-divider'">{{ item.name }}</el-divider>
          <div v-if="item.compTag === 'el-input-number'"
               class="el-input-number-container">
            <div class="input-number-label">{{ item.name }}：</div>
            <el-input-number 
              v-model="currentCompInfo.propStyle[item.valueName]"
              controls-position="right"
              v-bind="item.comProps"></el-input-number>
          </div>
          <div v-if="item.compTag === 'el-input'"
               class="el-input-container">
            <div class="input-label">{{ item.name }}：</div>
            <el-input v-model="currentCompInfo.propValue[item.valueName]"></el-input>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { isDef, deepClone } from '../utils';

export default {
  data() {
    return {
      inputNum: 0,
      compConfigData: []
    };
  },
  computed: {
    ...mapState({
      currentCompIndex: state => state.common.currentCompIndex,
      currentCompListData: state => state.common.currentCompListData
    }),
    // 当前组件信息
    currentCompInfo() {
      return this.currentCompListData[this.currentCompIndex] || {};
    },
    isCompEmpty() {
      return !isDef(this.currentCompIndex);
    }
  },
  watch: {
    currentCompIndex(newV) {
      if (isDef(newV)) {
        console.log('newV:', newV);
        this.compConfigData =
          require(`../config/compConfig/${this.currentCompInfo.configDataPathName}Config`).default;
      }
    }
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
</style>