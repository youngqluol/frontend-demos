<template>
  <div class="hello">
    <home-son v-if="false">
    </home-son>
    <ul class="theme-ul">
      <li v-for="item in themeHouse" :key="item.id" class="theme-li" @click="goPage(item.route,item.id)">{{item.name}}</li>
    </ul>
    <div @click="goRanking">排行榜</div>
    <ranking v-if="rankingShow" @closeRanking="goRanking"></ranking>
  </div>
  <!-- <div v-else>22222</div> -->
</template>

<script>
import ranking from '@/components/ranking';
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'home',
  components: {
    ranking
  },
  data () {
    return {
      rankingShow: false,
      msg: '这次只提交选择的文件',
      isShow: false,
      arry: ['领取', '领取', '领取'],
      themeHouse: [{id: 1, name: '旅游', route: 'tour'}, {id: 2, name: '历史', route: 'history'}, {id: 5, name: '美食', route: 'food'}, {id: 4, name: '生活', route: 'life'}, {id: 3, name: '答题', route: 'topic'}]
    };
  },
  methods: {
    ...mapMutations(['vuexTest']),
    ...mapActions({b: 'vuexTest1'}),
    show () {
      this.b(2);
    },
    showMask (a, e) {
      if (e.target === document.querySelector('.mask')) {
        return;
      }
      this.isShow = true;
      console.log(a);
    },
    goPage (route, id) {
      //  每日可免费参与当日主题馆，若想参与之前的主题馆（例用户在10月2号想参与1号主题馆的活动），需用金币兑换门票
      if (id > 3) {
        alert('场馆还未开放');
      } else if (id < 3) {
        alert('进入该场馆需要消耗金币');
      } else {
        this.$router.push({name: route});
      }
    },
    // 打开、关闭排行榜
    goRanking () {
      this.rankingShow = !this.rankingShow;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .a {
    width: 100px;
    height: 50px;
    border: 1px solid red;
    position: relative;
  }
  .a .mask {
    width: 100px;
    height: 50px;
    background: rgba(0,0,0,0.2);
    position: absolute;
    top: 0;
    left: 0;
  }
  .hello {
    .theme-ul {
      .theme-li {
        width: 50px;
        height: 50px;
        border: 1px solid red;
        margin: 0 auto;
      }
    }
  }
</style>
