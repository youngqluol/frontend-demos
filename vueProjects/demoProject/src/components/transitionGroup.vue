<template>
  <div>
    <transition-group name="gone" tag="ul">
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
    </div>-->
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
      ]
      // items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }
  // method
  //   // shuffle: function () {
  //   //   this.items = shuffle(this.items);
  //   // }
  // }
};
</script>

<style lang="less" scoped>
ul {
  width: 200px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.liItem {
  width: 200px;
  transition: all 0.5s;
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
</style>
