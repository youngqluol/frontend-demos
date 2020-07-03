<template>
  <div class="hello">
    <!-- <home-son v-if="false">
    </home-son>
    <ul class="theme-ul">
      <li v-for="item in themeHouse" :key="item.id" class="theme-li" @click="goPage(item.route,item.id)">{{item.name}}</li>
    </ul>-->
    <!-- <div @click="goRanking">排行榜</div> -->
    <!-- 在组件上使用v-model -->
    <!-- <ranking v-show="modelData" @closeRanking="goRanking" v-model="modelData"></ranking>
    <div>{{modelData}}</div>-->
    <!-- <div v-show="test4">{{test1}}151515151</div> -->
    <!-- <div>
      <ul class="theme-ul">
        <li v-for="item in lightDays" :key="item.id" class="theme-li" @click="sign(item.id)" :class="{'active': item.isLight}"></li>
      </ul>
    </div>-->
    <!-- <div @click="changeSrc" :style="{fontSize: size + 'px'}">点我</div>
    <div>{{imgSrc}}</div>-->
    <!-- <img :src="imgSrc"> -->
    <!-- 自定义事件 -->
    <font-size @bigFont="bigFontSize" :title.sync="title" camel-data>
      <!--  slot="slot2" 这个语法已经被废弃了 -->
      <!-- <div slot="slot2">这是插槽2的</div>
      <div slot="slot1">这是插槽1的</div>-->
      <!-- 新的语法如下 -->
      <div slot="slot2">这是插槽2的</div>
      <div slot="slot1">这是插槽1的</div>
    </font-size>
    <!-- <div>{{title}}</div> -->
    <!-- 本地存储的demo -->
    <div @click="setItem">先设置一个本地存储</div>
    <div @click="$router.push('/button')">点击进入button页面</div>

    <!-- 难度选择demo -->
    <ul class="type-demo">
      <li
        v-for="(item, i) in typeArry"
        :key="i"
        style="width: 100px;height: 50px;border: 1px solid red;"
        :class="[chanceArry[i] > 0 ? 'type-li' : 'no-color']"
        @click="reduceChance(i)"
      >{{item.type}},机会：{{chanceArry[i]}}</li>
    </ul>

    <!-- 路由demo -->
    <div @click="routerPush('路由跳转之后传过来的值')">点击跳转</div>
  </div>
</template>

<script>
import ranking from "@/components/ranking";
import fontSize from "@/components/fontSize";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "home",
  components: {
    ranking,
    fontSize
  },
  created() {
    //  先获取用户的签到记录（返回的签到格式是： ['2019-10-23']）
    //  截取 日 这一部分，并保存进一个数组：lightStatus
    //  根据lightStatus 对lightDays这个数组进行处理
    let temp = this.lightDays.map((item, index) => {
      for (let value of this.lightStatus) {
        if (value === item.id) {
          item.isLight = true;
        }
      }
      return item;
    });
    this.lightDays = temp;
    if (!localStorage.getItem("local_chance")) {
      this.chanceArry = [5, 5, 5];
      // localStorage.setItem('local_chance', JSON.stringify(temp));
    } else {
      this.chanceArry = JSON.parse(localStorage.getItem("local_chance"));
    }
    // this.tp = JSON.parse(localStorage.getItem('local_chance'));
  },
  mounted() {
    this.camelData = "gogo";
  },
  computed: {
    chanceArry: {
      get() {
        return this.tp;
        // return JSON.parse(localStorage.getItem('local_chance'));
      },
      set(newV) {
        localStorage.setItem("local_chance", JSON.stringify(newV));
        this.tp = JSON.parse(localStorage.getItem("local_chance"));
      }
    },
    test1() {
      return this.test2 + this.test3;
    },
    test2() {
      return 3;
    },
    test3() {
      return 3;
    },
    test4() {
      if (this.a === 3) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      // chanceArry: JSON.parse(localStorage.getItem('local_chance')),
      // 难度选择按钮demo
      typeArry: [
        { type: "困难", chance: 5 },
        { type: "中等", chance: 5 },
        { type: "简单", chance: 5 }
      ],
      camelData: "",
      title: "这是标题",
      modelData: 1,
      size: 15,
      imgSrc: "http://pic25.nipic.com/20121112/9252150_150552938000_2.jpg",
      assign: { a: 1, b: 2, c: 3 },
      a: 0,
      gogo: true,
      rankingShow: false,
      msg: "这次只提交选择的文件",
      isShow: false,
<<<<<<< HEAD
      arry: ["领取", "领取", "领取"],
=======
      arry: ['领取', '领取', '领取'],
<<<<<<< HEAD
      timer: null,
      left: 0
=======
>>>>>>> 21c7f45a8fe1c343c2579e8071f5bd383269e724
      // themeHouse: [{id: 1, name: '旅游', route: 'tour'}, {id: 2, name: '历史', route: 'history'}, {id: 5, name: '美食', route: 'food'}, {id: 4, name: '生活', route: 'life'}, {id: 3, name: '答题', route: 'topic'}],
      lightDays: [
        { id: 23, isLight: false },
        { id: 24, isLight: false },
        { id: 25, isLight: false }
      ],
      lightStatus: [23, 25],
      tp: []
>>>>>>> dev
    };
  },
  created () {
    this.timer = setInterval(() => {
      this.left -= 2;
      let liWidth = document.querySelectorAll('li')[0].offsetWidth;
      console.log(document.querySelectorAll('li')[0].offsetWidth);
      console.log(document.querySelector('.container').style);
      if (this.left === -liWidth * 2) {
        console.log('该结束了');
        clearInterval(this.timer);
        // document.querySelector('.container').style.overflow = 'scroll';
        // document.querySelector('.container').style.left = '';
        // this.left = null;
        // document.querySelector('.container').style = '';
        this.left = null;
      };
    }, 100);
  },
  methods: {
    reduceChance(i) {
      // let arry = JSON.parse(localStorage.getItem('local_chance'));
      let tempArry = this.chanceArry.map((item, index) => {
        if (index === i) {
          item--;
          item = item > 0 ? item : 0;
        }
        return item;
      });
      // localStorage.setItem('local_chance', JSON.stringify(tempArry));
      this.chanceArry = tempArry;
    },
    // 本地存储
    setItem() {
      localStorage.setItem("limit_chance", "yes");
    },
    bigFontSize(n) {
      // 这个n 是子组件中传回来的值
      console.log(this.size);
      this.size = n;
    },
    async changeSrc() {
      this.imgSrc =
        "http://img0.imgtn.bdimg.com/it/u=2854956166,1658664264&fm=26&gp=0.jpg";
      await this.$nextTick(); //  为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)
      console.log(document.querySelector("img").src);
    },
    assignObj(a = {}) {
      for (let key in a) {
        this.$set(this.assign, key, a[key]);
      }
    },
    sign(day) {
      if (day === 24) {
        // 如果是当天
        let tempArry = this.lightDays.map((item, index) => {
          if (item.id === 24) {
            item.isLight = true;
          }
          return item;
        });
        this.lightDays = tempArry;
      } else {
        alert("你只可以点当天的灯并获得抽奖机会");
      }
    },
    go() {
      setInterval(() => {
        this.gogo = !this.gogo;
      }, 1000);
    },
    ...mapMutations(["vuexTest"]),
    ...mapActions({ b: "vuexTest1" }),
    show() {
      this.b(2);
    },
    showMask(a, e) {
      if (e.target === document.querySelector(".mask")) {
        return;
      }
      this.isShow = true;
      console.log(a);
    },
    goPage(route, id) {
      //  每日可免费参与当日主题馆，若想参与之前的主题馆（例用户在10月2号想参与1号主题馆的活动），需用金币兑换门票
      if (id > 3) {
        alert("场馆还未开放");
      } else if (id < 3) {
        alert("进入该场馆需要消耗金币");
      } else {
        this.$router.push({ name: route });
      }
    },
    // 打开、关闭排行榜
    goRanking() {
      this.rankingShow = !this.rankingShow;
    },
    routerPush(value) {
      this.$router.push({ name: "filter", params: { id: "123" } }).then(() => {
        console.log(value);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<<<<<<< HEAD
<style lang="less" scoped>
  /* .div {
  } */
  * {
    margin: 0;
    padding: 0;
=======
<style scoped lang="less">
<<<<<<< HEAD
.active {
  background-color: red;
}
.a {
  width: 100px;
  height: 50px;
  border: 1px solid red;
  position: relative;
}
.a .mask {
  width: 100px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
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
=======
  .active {
    background-color: red;
>>>>>>> dev
  }
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
<<<<<<< HEAD
    // position: relative;
    .lis {
      width: 50px;
      height: 50px;
      position: relative;
      overflow: scroll;
      border: 1px solid red;
      .container {
        width: 100px;
        padding: 0;
        position: absolute;
        left: 10px;
        overflow: scroll;
          li {
            display: inline-block;
            list-style: none;
            width: 30px;
            img {
              display: block;
              width: 30px;
            }
          }
        }
      }
=======
    .theme-ul {
      .theme-li {
        width: 50px;
        height: 50px;
        border: 1px solid red;
        margin: 0 auto;
      }
>>>>>>> 21c7f45a8fe1c343c2579e8071f5bd383269e724
    }
  }

  .type-demo {
    .type-li {
      background-color: rgb(254, 155, 68);
    }

    .no-color {
      background-color: gray;
    }
>>>>>>> dev
  }
}
</style>
