<template>
  <div>

    <transition-group name="gone" tag="ul" >
      <li v-for="(item, index) in list" :key="item.content" class="liItem">
        <span :style="{'backgroundColor': item.bg}">{{item.content}}</span>
        <span @click="list.splice(index, 1)">删除</span>
      </li>
    </transition-group>

  <!-- <div id="flip-list-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <transition-group name="flip-list" tag="ul">
    <li v-for="item in items" v-bind:key="item">
      {{ item }}
    </li>
  </transition-group>
</div> -->
  <div class="box">
    <div class="praise" :class="[test ? 'praised' : 'normal']" @click="testM($event)"></div>
    <div class="div"></div>
  </div>

  </div>
</template>

<script>
// import { shuffle } from 'lodash';
export default {
  data () {
    return {
      list: [
        {id: 1, content: '第一行', bg: 'yellow'},
        {id: 2, content: '第二行', bg: 'green'},
        {id: 3, content: '第三行', bg: 'pink'},
        {id: 4, content: '第四行', bg: 'black'}
      ],
      test: false
      // items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    // shuffle: function () {
    //   this.items = shuffle(this.items);
    // }
    testM (e) {
      e.target.classList.add('animation');
      setTimeout(() => {
        this.test = !this.test;
        e.target.classList.remove('animation');
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  .praise {
  width:42px;
  height: 40px;
  background-size: 42px 40px;
  }

  .normal {
  background: url('../assets/images/normal.png');
}

.praised {
  background: url('../assets/images/praised.png');
}

  .div {
    width:42px;
  height: 40px;
  border: 1px solid red;
  }
}

.animation {
  animation: move .2s;
}
   ul {
     width: 200px;
     position: absolute;
     left: 50%;
     transform: translateX(-50%);
   }
  .liItem {
    width: 200px;
    transition: all .5s;
  }
  .gone-leave-to {
    // transform: translateX(-50px);
    opacity: 0;
  }
  // .gone-leave-active {
  //   transition: all 1s ease-out;
  // }
  .gone-leave-active {
    position: absolute;
  }
  // .gone-move {
  //   transition: transform 1s;
  // }
//   .flip-list-move {
//   transition: transform 1s;
// }
@keyframes move {
  0% {
    background: url('../assets/images/praised.png');
    border: none;
    transform: scale(1.1);
  }
  10% {
    background: url('../assets/images/praised.png');
    border: none;
    transform: scale(1.15);
  }
  20% {
    background: url('../assets/images/praised.png');
    border: none;
    transform: scale(1.2);
  }
  30% {
    background: url('../assets/images/praised.png');
    transform: scale(1.25);
    border: none;
  }
  40% {
    background: url('../assets/images/praised.png');
    transform: scale(1.3);
    border: none;
  }
  50% {
    background: url('../assets/images/praised.png');
    transform: scale(1.35);
    border: none;
  }
  60% {
    background: url('../assets/images/praised.png');
    transform: scale(1.4);
    border: none;
  }
  70% {
    background: url('../assets/images/praised.png');
    transform: scale(1.45);
    border: none;
  }
  80% {
    background: url('../assets/images/praised.png');
    transform: scale(1.5);
    border: none;
  }
  90% {
    background: url('../assets/images/praised.png');
    transform: scale(1.55);
    border: none;
  }
  100% {
    background: url('../assets/images/praised.png');
    transform: scale(1.6);
    border: none;
  }
}
</style>
