<template>
  <div class="outside">
    <div @click="clearArry">重新答题</div>
    <div @click="submit">提交</div>
    <ul class="choosen-ul">
      <!-- <li v-html="arryChoosen[0] || ''"></li>
      <li v-html="arryChoosen[1] || ''"></li>
      <li v-html="arryChoosen[2] || ''"></li>-->
      <li v-for="(item,index) in arryChoosen" :key="index" v-html="item.text || ''"></li>
    </ul>
    <ul class="base-ul">
      <li v-for="item in arryText" :key="item.id" @click="choose(item.text)">{{item.text}}</li>
    </ul>
  </div>
</template>
<script>
import { findIndex } from 'lodash';
export default {
  data () {
    return {
      correct: '李元霸',
      answer: '',
      posi: 0,
      quality: 3, //  自定义答案框的个数
      arryChoosen: [],
      arryText: [
        { id: 1, text: '元' },
        { id: 2, text: '李' },
        { id: 3, text: '霸' },
        { id: 4, text: '郭' },
        { id: 5, text: '富' },
        { id: 6, text: '天' },
        { id: 7, text: '姐' }
      ]
    };
  },
  created () {
    for (let i = 0; i < this.quality; i++) {
      this.arryChoosen.push({ text: '' });
    }
  },
  methods: {
    choose (text) {
      // console.log(this.arryChoosen);
      if (this.posi === this.quality - 1) {
        return;
      }
      this.posi = findIndex(this.arryChoosen, item => {
        return item.text === '';
      });
      // console.log(position);
      this.arryChoosen[this.posi].text = text;
    },
    clearArry () {
      for (let i = 0; i < this.quality; i++) {
        this.arryChoosen[i].text = '';
        this.posi = 0;
      }
    },
    submit () {
      this.answer = '';
      for (let i = 0; i < this.quality; i++) {
        this.answer += this.arryChoosen[i].text;
      }
      console.log(this.answer);
      if (this.answer === this.correct) alert('恭喜你答对了');
      else alert('答错了');
    }
  }
};
</script>
<style lang="less" scoped>
.outside {
  display: flex;
  flex-direction: column;
  .choosen-ul {
    display: flex;
    li {
      width: 50px;
      height: 50px;
      border: 1px solid red;
    }
  }
  .base-ul {
    display: flex;
    li {
      width: 50px;
      height: 50px;
      border: 1px solid red;
    }
  }
}
</style>
