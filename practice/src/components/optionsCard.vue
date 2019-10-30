<template>
  <div>
    <ul>
      <li v-for="(item, index) in titles" :key="index" :class="{active: index === curId}" @click="tab(index)">{{item}}</li>
    </ul>
    <ul>
      <li v-for="(item, index) in contents" :key="index" v-show="index === curId">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      titles: ['一', '二', '三', '四'],
      contents: ['111111', '22222', '333333', '44444'],
      curId: 1
    };
  },
  methods: {
    tab (index) {
      this.curId = index;
    }
  }
};
</script>
<style lang="less" scoped>
.active {
  background-color: red;
}
</style>
