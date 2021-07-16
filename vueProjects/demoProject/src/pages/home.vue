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
        <font-size @bigFont="bigFontSize" 
                   :title.sync="title" 
                   camel-data>
            <!--  slot="slot2" 这个语法已经被废弃了 -->
            <!-- <div slot="slot2">这是插槽2的</div>
      <div slot="slot1">这是插槽1的</div> -->
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
        style="width: 100px; height: 50px; border: 1px solid red"
        :class="[chanceArry[i] > 0 ? 'type-li' : 'no-color']"
        @click="reduceChance(i)"
      >
        {{ item.type }},机会：{{ chanceArry[i] }}
      </li>
    </ul>

        <!-- 路由demo -->
        <div @click="routerPush('路由跳转之后传过来的值')">点击跳转</div>
    </div>
</template>
<script>
export default {
  name: "home",
  components: {
    ranking,
    fontSize,
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
      },
    },
    test1() {
      return this.test2 + this.test3;
    },
    test2() {
      return 3;
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
            arry: ["领取", "领取", "领取"],
            // themeHouse: [{id: 1, name: '旅游', route: 'tour'}, {id: 2, name: '历史', route: 'history'}, {id: 5, name: '美食', route: 'food'}, {id: 4, name: '生活', route: 'life'}, {id: 3, name: '答题', route: 'topic'}],
            lightDays: [
                { id: 23, isLight: false },
                { id: 24, isLight: false },
                { id: 25, isLight: false }
            ],
            lightStatus: [23, 25],
            tp: []
        };
    },
    test4() {
      if (this.a === 3) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      // chanceArry: JSON.parse(localStorage.getItem('local_chance')),
      // 难度选择按钮demo
      typeArry: [
        { type: "困难", chance: 5 },
        { type: "中等", chance: 5 },
        { type: "简单", chance: 5 },
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
      arry: ["领取", "领取", "领取"],
      // themeHouse: [{id: 1, name: '旅游', route: 'tour'}, {id: 2, name: '历史', route: 'history'}, {id: 5, name: '美食', route: 'food'}, {id: 4, name: '生活', route: 'life'}, {id: 3, name: '答题', route: 'topic'}],
      lightDays: [
        { id: 23, isLight: false },
        { id: 24, isLight: false },
        { id: 25, isLight: false },
      ],
      lightStatus: [23, 25],
      tp: [],
    };
  },
  methods: {
    reduceChance(i) {
      // let arry = JSON.parse(localStorage.getItem('local_chance'));
      let tempArry = this.chanceArry.map((item, index) => {
        if (index === i) {
          item--;
          item = item > 0 ? item : 0;
        }
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
    methods: {
        reduceChance(i) {
            // let arry = JSON.parse(localStorage.getItem('local_chance'));
            let tempArry = this.chanceArry.map((item, index) => {
                if (index === i) {
                    item--;
                    item = item > 0 ? item : 0;
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
    
</style>