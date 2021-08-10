<template>
  <div class="info-page">
    <button @click="getInfo">点击请求</button>
    <button @click="postInfo">点击post</button>
    <button @click="addInfo">添加数据</button>
    <div>{{ info }}</div>
    <div>{{ postRes }}</div>
    <div>{{ addRes }}</div>
    <div v-for="index in 3"
         :key="index">{{ test(index) }}</div>
  </div>
</template>
<script>
import { getCommonInfo, postInfo, addUserInfo } from '../api';

export default {
  data() {
    return {
      info: null,
      postRes: null,
      addRes: null,
      test: (value) => { return value; } 
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
    },

    addInfo() {
      addUserInfo()
        .then(res => {
          this.addRes = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>