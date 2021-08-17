<template>
  <div ref="display-area"
       class="display-area"
       @drop="handleDrop"
       @dragover="handleDragOver"
       @mousedown="handleMouseDown($event)"
  >
    <component :is="item.component"
               v-for="(item, index) in currentCompListData"
               :key="index"
               :ref="item.compRef"
               :propStyle="item.propStyle"
               v-bind="item.propValue"
    ></component>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentCompListData: state => state.common.currentCompListData
    })
  },

  methods: {
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const index = e.dataTransfer.getData('index');
      const dom = this.$refs['display-area'];
      const { pageX, pageY } = e;
      const { top, left } = dom.getBoundingClientRect();
      this.$store.commit('addComp', {
        index,
        propStyle: { left: pageX - left + 'px', top: pageY - top + 'px' }
      });
    },
    handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    handleMouseDown(e) {
      console.log('comp mouse down');
      console.log(e);
      // const {  }
      // 点击时区域时遍历所有组件位置，找出点击的是哪个组件
      // this.currentCompListData.map()
    }
  }
};
</script>
<style lang="less" scoped>
  .display-area {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>