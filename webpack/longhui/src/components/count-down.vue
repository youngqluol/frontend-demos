<template>
  <span>
    <i class="i hour" v-if="h1">{{h1}}</i>
    <i class="i hour">{{h2}}</i>
    <i class="i hour">{{h3}}</i>
    <span>:</span>
    <i class="i minute">{{m1}}</i>
    <i class="i minute">{{m2}}</i>
    <span>:</span>
    <i class="i second">{{s1}}</i>
    <i class="i second">{{s2}}</i>
  </span>
</template>

<script>
export default {
  props: {
    endTime: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      h1: "",
      h2: "",
      h3: "",
      m1: "",
      m2: "",
      s1: "",
      s2: "",
      timer: null
    };
  },
  computed: {
    d() {
      return +this.endTime - +new Date();
    }
  },
  created() {
    if (this.timer) { return }
    this.timer = setInterval(() => {
      let d = +this.endTime - +new Date();
      let h = parseInt(d / (60 * 60 * 1000));
      let left = d % (60 * 60 * 1000);
      let m = parseInt(left / (60 * 1000));
      left = left % (60 * 1000);
      h = h.toString();
      m = m.toString();
      m = (+m < 10) ? ("0" + m) : m;
      let s = (left / 1000).toString();
      s = (+s < 10) ? ("0" + s) : s
      let hasThreeNumber = h.length > 2;
      this.h1 = hasThreeNumber ? h.substring(0, 1) : '',
      this.h2 = hasThreeNumber ? h.substring(1, 2) : h.substring(0, 1);
      this.h3 = hasThreeNumber ? h.substring(2, 3) : h.substring(1, 2);
      this.m1 = m.substring(0, 1);
      this.m2 = m.substring(1, 2);
      this.s1 = s.substring(0, 1);
      this.s2 = s.substring(1, 2);
    }, 1000);
  },
  beforeDestroy() {
      if (!this.timer) { return; }
      clearInterval(this.timer);
  }
};
</script>

<style lang="stylus" scoped>
.i {
  margin-left: 3px;
  padding: 0 1px;
  font-style: normal;
  display: inline-block;
  background: #fad292;
  color: #e13c38;
}
</style>