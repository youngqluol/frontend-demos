<template>
  <wang-editor />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import WangEditor from './components/WangEditor.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld
    WangEditor
  },
  methods: {
  }
};
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
