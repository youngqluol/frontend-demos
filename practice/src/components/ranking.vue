<template>
  <div class="son" v-show="value">
    <div class="mask"></div>
    <div class="rank-body">
        这是排行榜数据
      <div @click="$emit('closeRanking')" class="close">点击我关闭排行榜弹窗</div>
      <ul class="ranking-title">
        <li @click="showPartRank" :class="{active: toggle}">分馆排行</li>
        <li @click="showAllRank" :class="{active: !toggle}">总馆排行</li>
      </ul>
      <div class="container" v-if="toggle">
        <div class="ranking-select">
          {{venue}}
          {{num}}
          <select v-model="venue">
            <option value="旅游馆" selected>旅游馆</option>
            <option value="生活馆">生活馆</option>
          </select>
        </div>
        <ul class="ranking">
          <li v-for="(item,index) in rankArry" :key="index">{{item.ranking}}{{item.name}}{{item.score}}</li>
        </ul>
      </div>
      <div class="container" v-else>
        <ul class="ranking">
          <li v-for="(item,index) in rankArry" :key="index">{{item.ranking}}{{item.name}}{{item.score}}</li>
        </ul>
      </div>
    </div>
    <!-- 在子组件中需要这样写 -->
    <input :value="value" @input="$emit('input',$event.target.value)">
  </div>
</template>
<script>
// import * as types from '@/store/types';
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      toggle: false,
      venue: '旅游馆',
      num: new Date().getDate()
    };
  },
  props: ['value'], // 在组件上使用v-model
  computed: {
    rankArry ({$store}) {
      return $store.state.rank.rankArry;
    }
  },
  methods: {
    ...mapMutations(['getRankArry']),
    showAllRank () {
      this.toggle = false;
      this.getRankArry('all');
      console.log(this.getRankArry);
    },
    showPartRank () {
      // console.log('part');
      this.toggle = true;
      this.getRankArry('tour');
    }
  }
};
</script>
<style scoped lang="less">
    .active {
      background: blue;
    }
    input {
      position: absolute;
        z-index: 999;
    }
    .son {
      // position: absolute;
      // width: 100%;
      // top: 0;
      animation: rank .5s ease-in;
      color: yellowgreen;
      .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.7);
      }
      .rank-body {
        position: absolute;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        .ranking-title {
          display: flex;
          li {
            width: 100px;
            height: 40px;
            border: 1px solid red;
          }
        }
        .container {
          width: 200px;
          height: 800px;
          border: 1px solid red;
        }
      }
    }
  @keyframes rank {
    from {
      opacity: 0;
      // top: 50px;
    }
    to {
      opacity: 1;
      // top: 0;
    }
  }
</style>
