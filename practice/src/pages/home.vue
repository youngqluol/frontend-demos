<template>
  <div class="hello">
    <home-son>
    </home-son>
    <div @click="show"> 1111 </div>
    <!-- <div class="a" @click="showMask">领取</div>
    <div class="a">领取</div>
    <div class="a">领取</div> -->
    <div v-for="(item, index) in arry" :key="index" class="a" @click="showMask(1,$event)">{{item}}
      <div class="mask" v-show="isShow"></div>
    </div>

  </div>
</template>

<script>
import HomeSon from '@/components/homeSon';
import { mapMutations, mapActions } from 'vuex';
// import * as types from '@/store/types'
export default {
  name: 'home',
  components: {
    'home-son': HomeSon
  },
  data () {
    return {
      msg: '这次只提交选择的文件',
      isShow: false,
      arry: ['领取', '领取', '领取']
    };
  },
  methods: {
    // ...mapMutations({a: types.vuexTest}),
    ...mapMutations(['vuexTest']),
    ...mapActions({b: 'vuexTest1'}),
    // show () {
    //   this.vuexTest(3)
    // }
    show () {
      this.b(2);
    },
    showMask (a, e) {
      if (e.target === document.querySelector('.mask')) {
        return;
      }
      this.isShow = true;
      console.log(a);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .div {
  } */
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
</style>
