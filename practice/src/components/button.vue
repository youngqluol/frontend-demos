<template>
  <div>
    <div class="mask" v-show="isMask"></div>
    <ul class="count">
      <li v-for="(item, index) in countNumber" :key="index" v-show="index === maskId">{{item}}</li>
    </ul>
    <div class="dead-time">00:{{deadTime | timerFileter}}</div>
    <ul>
      <li v-for="item in questionList" :key="item.id" v-show="item.id === curId">{{item.content}}</li>
    </ul>
    <ul>
      <li v-for="(item, index) in answerArry" :key="index" style="width:100px;height:50px;border:1px solid red;" @click="pick(item, index)">{{item}}</li>
    </ul>
    <div>正确：{{correctAnswer}}</div>
    <div>错误：{{wrongAnswer}}</div>
    <a href="http://www.baidu.com">baidu</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMask: false,
      countNumber: ['3', '2', '1', 'go'],
      maskId: 0,
      countTimer: null,
      // 问题
      curId: 0,
      timer: null,
      questionList: [{
        id: 0,
        content: '问题一',
        answer: 'A'
      },
      {
        id: 1,
        content: '问题二',
        answer: 'B'
      },
      {
        id: 2,
        content: '问题三',
        answer: 'C'
      },
      {
        id: 3,
        content: '问题四',
        answer: 'A'
      }
      ],
      // dead
      deadTime: 10,
      deadTimer: null,
      // answer
      answerArry: ['A', 'B', 'C'],
      curAnswer: '',
      correctAnswer: 0,
      wrongAnswer: 0,
      // index
      index: 0
    };
  },
  created () {
    // this.isMask = true;
  },
  mounted () {
    // this.startCountTimer();
    // console.log('来源：' + document.referrer);
    localStorage.getItem('limit_chance') ? localStorage.removeItem('limit_chance') : console.log('没有本地存储');
    // localStorage.removeItem('limit_chance');
  },
  beforeDestroy () {
    clearInterval(this.timer);
    clearInterval(this.countTimer);
    clearInterval(this.deadTimer);
    this.timer = null;
    this.countTimer = null;
    this.deadTimer = null;
  },
  filters: {
    'timerFileter': (value) => {
      if (value < 10) {
        value = '0' + value;
      }
      return value;
    }
  },
  methods: {
    pick (item) {
      // this.curAnswer = item;
      // this.curAnswer = this.questionList[this.index].answer;
      if (this.questionList[this.index].answer === item) {
        this.correctAnswer++;
      } else {
        this.wrongAnswer++;
      }
      this.deadTime = 0;
    },
    // compareAnswer (item) {
    //   if (item === this.curAnswer) {
    //     this.correctAnswer++;
    //   } else {
    //     this.wrongAnswer++;
    //   }
    // },
    // startTimer () {
    //   this.timer = setInterval(() => {
    //     this.curId++;
    //     console.log(this.curId);
    //     // this.curId > 3 ? this.curId = 0 : this.curId = this.curId;
    //     if (this.curId > 3) {
    //       console.log('你已经完成');
    //     }
    //   }, 5000);
    // },
    // 答题时的计时器
    startDeadTimer () {
      this.deadTimer = setInterval(() => {
        this.deadTime--;
        // this.deadTime < 10 ? this.deadTime = '0' + this.deadTime : this.deadTime = this.deadTime;
        console.log(this.deadTime);
        // this.curId > 3 ? this.curId = 0 : this.curId = this.curId;
        if (this.deadTime <= 0) {
          this.deadTime = 10;
          this.index++;
          this.curId++;
          if (this.curId > 3) {
            clearInterval(this.deadTimer);
            this.deadTimer = null;
            console.log('你已经完成');
          }
        }
      }, 1000);
    },
    // 页面刚进来时的倒计时
    startCountTimer () {
      this.countTimer = setInterval(() => {
        this.maskId++;
        console.log(this.maskId);
        if (this.maskId > 3) {
          this.isMask = false;
          clearInterval(this.countTimer);
          this.countTimer = null;
          this.startDeadTimer();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .count {
    color: red;
    font-size: 100px;
    width: 50%;
    height: 50%;
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);

    li {
      width: 100%;
      height: 100%;
    }
  }
</style>
