<template>
  <div class="page">
    <div class="bar_container"></div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div style="width: 21.6rem;height: 2rem;border: 1px solid red;"></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <div v-for="item in list" :key="item">{{item}}</div>
    </van-list>
    <van-tabs v-model="active" type="card" @click="handleTabClick" animated swipeable>
      <van-tab v-for="index in 3" :key="index" :name="index" :title="`标签${index}`">
        <template #title>
          <div class="tab_img" :style="{backgroundImg: `url(${index === active ? imgActive : imgNormal})`}">{{`标签${index}`}}</div>
        </template>
        {{`内容${index}`}}
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
const imgNormal = require('../assets/images/normal.png');
const imgActive = require('../assets/images/praised.png');
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      active: 2,
      imgNormal,
      imgActive
    };
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true;
        }
      }, 1000);
    },
    handleTabClick (name, title) {
      console.log(name, title);
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  overflow: auto;
  .bar_container {
    width: 10.8rem;
    height: 2rem;
    background: #000;
  }
}
.tab_img {
  width: 100%;
  height: 1.2rem;
}
</style>
<style lang="less">
</style>
