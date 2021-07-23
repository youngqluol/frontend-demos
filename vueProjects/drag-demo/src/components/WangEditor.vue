<template>
  <div class="editor-page">
    <h2>编辑器</h2>
    <div id="editor-wrapper">
      <p>初始化的内容</p>
      <a href="http://www.baidu.com/">链接</a>
    </div>
    <button @click="handleClick">测试</button>
    <button @click="getHtml">获取html内容</button>
    <div>{{ editorHtml }}</div>
    <div v-html="editorHtml"></div>
  </div>
</template>
<script>
import Editor from 'wangeditor';

export default {
  name: 'wang-editor',
  data() {
    return {
      editorInstance: null,
      editorHtml: ''
    };
  },
  mounted() {
    this.editorInstance = new Editor('#editor-wrapper');
    this.editorInstance.create();
  },
  methods: {
    handleClick() {

    },
    getHtml() {
      this.editorHtml = this.editorInstance.txt.html();
    }
  }
};
</script>
<style lang="less" scoped>

</style>