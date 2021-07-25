<template>
  <div class="info-page">
    <button @click="getInfo">点击请求</button>
    <button @click="postInfo">点击post</button>
    <div>{{ info }}</div>
    <div>{{ postRes }}</div>
  </div>
</template>
<script>
import { getCommonInfo, postInfo } from '../api';

export default {
  data() {
    return {
      info: null,
      postRes: null
    };
  },
  methods: {
    getInfo() {
      getCommonInfo()
        .then(res => {
          this.info = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    postInfo() {
      postInfo()
        .then(res => {
          this.postRes = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>