<template>
  <div class="danmu-container">
    <div class="danmu"></div>
    <button @click="sendDanmu()">发送我的弹幕</button>
    <button @click="addDanmu()">添加别的弹幕</button>
    <button @click="pause()">暂停弹幕</button>
    <button @click="play()">播放弹幕</button>
    <button @click="checkDanmuData()">查看弹幕数组</button>
    <button @click="triggerSend()">模拟用户发送</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      danmuData: ["1111", "1111", "1111", "1111"],
      myDamuContent: "我的内容"
    };
  },
  async mounted() {
    await this.$nextTick();
    const stage = document.querySelector(".danmu");
    //实例化弹幕
    window.danmuInstance = new danMu({
      device: "m",
      stage: $(".danmu"),
      comments: this.danmuData,
      danMuHtml: "<span>{comment}</span>",
      colors: ["#fff", "#00ccff", "#ff0000", "#00ff00", "#fef500"],
      flyTime: 7000,
      timeInterval: 1200,
      randomSort: true,
      myDanMuClassName: "my-danmu",
      myDanMuPrefix: "我",
      loop: false,
      distanceToStage: 10,
      hSpacingFixed: false
    });
  },
  methods: {
    sendDanmu() {
      window.danmuInstance.send(this.myDamuContent, () => {
        console.log("发送弹幕成功");
      });
      console.log(window.danmuInstance.comments);
    },
    addDanmu() {
      window.danmuInstance.append(["追加的数据"]);
    },
    pause() {
      window.danmuInstance.pause();
    },
    play() {
      window.danmuInstance.play();
    },
    checkDanmuData() {
      console.log(window.danmuInstance.comments);
    },
    triggerSend() {
      window.danmuInstance.triggerSend(
        {
          data: "弹弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕弹幕幕",
          sendid: "弹幕id",
          insert: false
        },
        () => {
          console.log("triggerSend Succ");
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.danmu {
  width: 10.8rem;
  height: 5rem;
  box-sizing: border-box;
  border: 1px solid red;
}

.my-danmu {
  color: #000;
}
</style>