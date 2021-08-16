<template>
  <div class="page-home">
    <header>头部</header>
    <section class="main-contaner">
      <div class="comp-list">组件库</div>
      <div class="main">画布</div>
      <div class="editor-area">属性配置</div>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
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
        border: 1px solid red;
      }

      .main {
        width: 6rem;
        height: 100%;
        border: 1px solid red;
      }

      .editor-area {
        width: 3rem;
        height: 100%;
        border: 1px solid red;
      }
    }
  }
</style>