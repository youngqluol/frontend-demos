<template>
  <div class="display-area"
       @drop="handleDrop"
       @dragover="handleDragOver"
       @mousedown="handleMouseDown($event)">
    <component :is="item.component"
               v-for="(item, index) in currentCompListData"
               :key="index"
               :class="item.compClass"
               :propStyle="item.propStyle"
               v-bind="item.propValue"></component>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { $ } from '../utils';

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
    // 鼠标在编辑区域的相对位置
    computedMousePositon(e) {
      const { pageX, pageY } = e;
      const { top, left } = $('.display-area').getBoundingClientRect();
      return {
        left: pageX - left + 'px',
        top: pageY - top + 'px'
      };
    },
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const index = e.dataTransfer.getData('index');
      const { left, top } = this.computedMousePositon(e);
      this.$store.commit('addComp', {
        index,
        propStyle: { left, top }
      });
    },
    handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    handleMouseDown(e) {
      console.log('comp mouse down');
      const startX = e.pageX;
      const startY = e.pageY;
      // 记录下当前的鼠标点击位置
      const { left: mouseLeft, top: mouseTop } = this.computedMousePositon(e);
      // 点击区域时遍历所有组件位置，判断是否在组件内的点击
      this.currentCompListData.map((item, index) => {
        const { offsetWidth: compWidth, offsetHeight: compHeight } = $(
          '.' + item.compClass
        );
        const compStartLeft = parseFloat(item.propStyle.left);
        const compStartTop = parseFloat(item.propStyle.top);
        const isInHorizontalRange =
          parseFloat(mouseLeft) >= compStartLeft &&
          parseFloat(mouseLeft) <= compStartLeft + compWidth;
        const isInVerticalRange =
          parseFloat(mouseTop) >= compStartTop &&
          parseFloat(mouseTop) <= compStartTop + compHeight;
        // 如果在范围内，说明点击事件是在该组件上触发的
        if (isInHorizontalRange && isInVerticalRange) {
          // todo 记录点击的当前组件
          const move = e => {
            const curX = e.pageX;
            const curY = e.pageY;
            const top = curY - startY + compStartTop + 'px';
            const left = curX - startX + compStartLeft + 'px';
            // 修改当前组件样式
            this.$store.commit('setCurrentCompData', {
              index,
              payload: {
                propStyle: { left, top }
              }
            });
          };

          const up = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
          };

          document.addEventListener('mousemove', move);
          document.addEventListener('mouseup', up);
        }
      });
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