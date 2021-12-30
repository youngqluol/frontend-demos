<template>
  <div class="page">
    <div class="header">
      <div class="header__content">
        <div class="header__body" @click="goDetailPage">
          <img class="img-award" :src="app && app.act_pic">
          <div class="header__title">
            <h2 class="title">{{app && app.title}}</h2>
            <p class="tag">{{app && app.downloadNum}}人已领</p>
            <p class="count-down">
              距结束
              <count-down :end-time="endTime" v-if="showCountDown"></count-down>
            </p>
          </div>
        </div>
        <div class="header__btn flex-center"><app :app="app"></app></div>
      </div>

    </div>

    <app-list v-for="apps in appLists" :key="apps.title" :apps="apps"></app-list>
  </div>
</template>

<script>
import App from '../components/downloadAppBtn.vue';
import AppList from "../components/app-list.vue";
import CountDown from "../components/count-down.vue";
import { mapState } from "vuex";

export default {
  components: {
    App,
    AppList,
    CountDown
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      appLists: state => {
        return state.appLists.slice(1);
      },
      endTime: state => state.endTime,
      app: state => {
        let apps = state.appLists[0];
        return apps && apps.positionListList[0].exclusiveList[0];
	  },
	  showCountDown: state => {
		  return (+state.endTime) - (+new Date()) >= 0
	  }
    })
  },
  created() {
	  console.log(this.appLists)
  },
  methods: {
	  goDetailPage() {
		  this.$router.push({
        path: '/detail',
        query: this.app
		  })
	  }
  }
};
</script>

<style lang="stylus" scoped>
.page {
  background: url('../assets/fulise.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  padding-bottom: 20px;
}

.header {
  padding-top: 75px;
  display block;
}

.header__content {
  height: 168px;
  background: url('../assets/banner.jpg');
  background-size: 100% 168px;
  background-repeat: no-repeat;
  position relative
}
.header__title {
	display flex;
	flex-direction column;
	justify-content space-between
	height 76px;
}
.title {
	font-size: 16px;
    font-weight: bold;
    color: black;
}
.tag {
	font-size: 11px;
    color: black;
}
.count-down {
	font-size 12px;
}
.header__body {
	padding 25.2px 5% 0;
	display flex;
	align-items center;
	position relative
}
.header__btn {
	  z-index: 11;
    position: absolute;
    top: 83%;
    left: 50%;
    transform: translate(-50%,-50%);
    
    width: 88px;
    min-height 24px;
    padding: 5px 0;
    border-radius: 15.5px;
    border: none;
    background: #fc4746;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    font-size: 16px;
    color: white;
    overflow: hidden;
}
.img-award {
	width 93px;
	margin-right 5px;
}
</style>