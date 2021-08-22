<template>
  <div class="page-home">
    <header>头部</header>
    <section class="main-contaner">
      <div class="comp-list">
        <comp-list-box></comp-list-box>
      </div>
      <div class="main">
        <display-area-box></display-area-box>
      </div>
      <div class="editor-area">属性配置</div>
    </section>
  </div>
</template>
<script>
import CompListBox from '../components/CompListBox';
import DisplayAreaBox from '../components/DisplayAreaBox.vue';

export default {
  components: {
    CompListBox,
    DisplayAreaBox
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
  .page-home {
    font-size: 20px;
    width: 100%;
    box-sizing: border-box;

    .main-contaner {
      display: flex;
      justify-content: space-between;
      height: 8rem;

      .comp-list {
        width: 2rem;
        height: 100%;
        border: 1px solid gray;
      }

      .main {
        width: 6rem;
        height: 100%;
        border: 1px solid gray;
      }

      .editor-area {
        width: 3rem;
        height: 100%;
        border: 1px solid gray;
      }
    }
  }
</style>