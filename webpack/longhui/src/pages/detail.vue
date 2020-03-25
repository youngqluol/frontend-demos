<template>
  <div class="page">
    <header>
      <img class="img-banner" :src="app.banner" alt srcset />
    </header>

    <div class="content">
      <div class="detail">
        <div class="app-left">
          <img :src="app.gameIcon" alt="奖品对应的app icon" class="img-game" />
          <div class="app-middle">
            <h2 class="title">{{app.gameName}}</h2>
            <div class="tags">
              <span class="tag">{{app.downloadNum}}人已领</span>
              <img class="img-tag" :src="app.tag" alt srcset />
            </div>
          </div>
        </div>

        <div class="btn flex-center"><app :app="app"></app></div>
      </div>
      <section class="section rule">
        <img class="img-title" src="../assets/title-rule.png" alt srcset />
        <div class="text" :class="{'active': active}" v-html="app.rule"></div>
		<div class="more" :class="{'active': active}">
			<a href="javascript:void(0)" @click="showMore"></a>
		</div>
      </section>
      <section class="section attend">
        <img class="img-title" src="../assets/title-way.png" alt />
        <div class="text" v-html="app.method"></div>
      </section>
    </div>

    <div class="fix-bottom flex-center">
      <div class="btn flex-center"><app :app="app"></app></div>
    </div>
  </div>
</template>

<script>
import App from "../components/downloadAppBtn.vue";

export default {
  components: {
    App
  },
  data() {
    return {
	  app: {},
	  active: false
    };
  },
  mounted() {
    this.app = this.$route.query;
    console.log(this.app);
  },
  methods: {
	  showMore() {
		  this.active = !this.active
	  }
  }
};
</script>

<style lang="stylus" scoped>
.page {
  background: url('../assets/fulise.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  padding-bottom: 66px;
}

.detail {
  margin: 10px 8px;
  padding: 20px 8px 25px;
  background: #eee;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    width: 60px;
    padding: 4px 0;
    min-height: 24px;
    font-size: 12px;
    color: #f9ebb4;
    border-radius: 12px;
    border: none;
    background: -webkit-linear-gradient(left, #ff7950, #f35555);
    overflow: hidden;
  }
}

.img-banner {
  width: 100%;
  display: block;
}

.fix-bottom {
  width: 100%;
  padding: 15px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  background: #ffffff;

  .btn {
    width: 210px;
    height: 36px;
    font-size: 17px;
    border-radius: 18px;
    color: #fff;
    border: none;
    background: #fd6675;
    overflow: hidden;
  }
}

.img-tag {
  width auto;
  height: 15px;
  margin-right: 3px;
  vertical-align: middle;
}

.img-game {
  width: 50px;
  margin-right: 10px;
}

.app-left {
  display: flex;
}

.title {
  vertical-align: middle;
  display: inline-block;
  max-width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: black;
  font-size: 14px;
  font-weight: 400;
}

.app-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
  margin-top 6px;
}

.name {
  font-size: 12px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag {
  font-size: 11px;
  height: 15px;
  line-height: 13px;
  padding: 0 5px;
  margin-right: 3px;
  border: 1px solid rgba(147, 146, 146, 0.3);
  color: #939292;
  border-radius: 7px;
  display: inline-block;
  vertical-align: middle;
  max-width: 85px;
  min-width: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.section {
  margin: 10px 8px;
  padding: 10px 8px 15px;
  background: #eee;
  border-radius: 5px;

  .text {
    margin-top: 10px;
    font-size: 12px;
    color: #939393;
    overflow: hidden;
    line-height: 18px;
    word-break: break-all;
  }
}

.section.rule {
  .text {
    max-height: 57px;
	&.active {
		max-height 1000px;
	}
  }
  .more {
	  text-align right;
	  a {
		width: 15px;
    	height: 10px;
    	display: inline-block;
    	background: url(../assets/angle-more.png) no-repeat center;
    	background-size: 100%;
    	transition: transform 1s;
    	-webkit-transition: transform 1s;
	  }
	  
  }
  .more.active {
	  a {
    	transform: rotate(180deg);
    	-webkit-transform: rotate(180deg);
	  }
  }
}

.attend {
  margin: 10px 8px;
  padding: 10px 8px 15px;
  background: #eee;
  border-radius: 5px;
}

.img-title {
  padding-top: 10px;
  display: block;
  width 134px;
  margin 0 auto;
}
div>>>img {
  width 100%
}
</style>