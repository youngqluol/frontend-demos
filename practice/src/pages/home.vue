<template>
  <div class="hello">
    <home-son>
    </home-son>
    <div @click="show"> 1111 </div>
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
      msg: '这次只提交选择的文件'
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .div {
  } */
</style>
