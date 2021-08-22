<template>
  <div class="comp-list-box"
       @dragstart="handleDragStart">
    <div v-for="(item, index) in compListData"
         :key="item.name"
         class="comp-item"
         draggable
         :data-index="index"
         @mousedown="handleMouseDown"
         @dragend="handleDragEnd">{{ item.label }}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'comp-list-box',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      compListData: state => state.common.compListData
    })
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index);
    },
    handleMouseDown(e) {
      // console.log('mouse down');
    },
    handleDragEnd(e) {
      // console.log('drag end');
    }
  }
};
</script>
<style lang="less" scoped>
  .comp-list-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .comp-item {
      width: 80%;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      border: 1px solid gray;
    }
  }
</style>