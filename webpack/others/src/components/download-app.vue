<template>
  <div class="app">
    <div class="app-left" @click="goDetailPage">
      <img :src="app.act_pic" alt srcset class="img-award" />
      <div class="app-middle">
        <h2 class="title">{{app.title}}</h2>
        <div class="tags">
          <span class="tag">{{app.downloadNum}}人已领</span>
          <img class="img-tag" :src="app.tag" alt srcset />
        </div>
        <div class="detail">
          <img :src="app.gameIcon" alt="奖品对应的app icon" class="img-game" />
          <span class="name">{{app.gameName}}</span>
        </div>
      </div>
    </div>

    <div class="btn flex-center"><app :app="app"></app></div>
  </div>
</template>

<script>
import App from '../components/downloadAppBtn.vue';

export default {
  components: {
    App
  },
  props: {
    app: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    goDetailPage() {
      console.log(this.app);
      this.$router.push({
        path: "/detail",
        query: this.app
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.app {
  overflow: hidden;
  border-top: 1px solid rgba(216, 215, 219, 0.4);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.img-tag {
  height: 15px;
  margin-right: 3px;
  vertical-align: middle;
}

.img-award {
  width: 100px;
  margin-right: 10px;
}

.img-game {
  width: 20px;
  margin-right: 5px;
  border-radius: 10%;
  vertical-align: middle;
  display: inline-block;
}

.app-left {
  display: flex;
}

.title {
  font-size: 15px;
  color: #4c4c4c;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 65%;
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

.btn {
  width: 60px;
  padding: 4px 0;
  min-height: 24px;
  font-size: 12px;
  color: #f9ebb4;
  border-radius: 12px;
  border: none;
  position: absolute;
  right: 0;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  background: -webkit-linear-gradient(left, #ff7950, #f35555);
  overflow: hidden;
}
</style>