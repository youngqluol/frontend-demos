<template>
  <div class="display-area"
       @drop="handleDrop"
       @dragover="handleDragOver"
       @mousedown="handleMouseDown($event)">
    <div v-for="(item, index) in currentCompListData"
         :key="index"
         :class="{borderShow: index === currentClickCompIndex}"
         :style="compBorderStyle[index]"
         class="comp-border">
      <component :is="item.component"
                 :class="item.compClass"
                 :propStyle="{left: 0,top: 0}"
                 v-bind="item.propValue"></component>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { $, throttle } from '../utils';

export default {
  data() {
    return {
      compBorderStyle: [],
      currentClickCompIndex: null
    };
  },
  computed: {
    ...mapState({
      currentCompListData: state => state.common.currentCompListData
    })
  },

  watch: {
    currentCompListData: {
      handler: async function (val) {
        await this.$nextTick();
        this.compBorderStyle = val.map(item => {
          const comp = $(`.${item.compClass}`);
          const { offsetWidth, offsetHeight } = comp;
          item = {
            width: `${offsetWidth}px`,
            height: `${offsetHeight}px`,
            top: `${item.propStyle.top}`,
            left: `${item.propStyle.left}`
          };
          return item;
        });
      },
      deep: true
    }
  },

  methods: {
    // 鼠标在编辑区域的相对位置
    computedMousePosition(e) {
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
      const { left, top } = this.computedMousePosition(e);
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
      this.currentClickCompIndex = null;
      const startX = e.pageX;
      const startY = e.pageY;
      // 记录下当前的鼠标点击位置
      const { left: mouseLeft, top: mouseTop } = this.computedMousePosition(e);
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
          this.currentClickCompIndex = index;
          // todo 记录点击的当前组件
          const move = throttle(e => {
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
          }, 100);

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

    .borderShow {
      border: 1px solid red;
    }

    .comp-border {
      position: absolute;
    }
  }
</style>