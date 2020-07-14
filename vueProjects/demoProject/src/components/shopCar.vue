<template>
  <div>
    <input type="checkbox" v-model="allChosen" :value="shopArry" @change="changeAll" />
    <ul>
      <li v-for="(item, index) in shopCarData" :key="index">
        <input type="checkbox" v-model="shopArry" :value="item" @change="itemChange(shopArry)" />
        类型：{{item.name}} 价值：{{item.price}} 数量：
        <button @click="reduce(item)">-</button>
        <input type="text" v-model="item.quality" maxlength="3" />
        <button @click="add(item)">+</button>
        <button @click="deleteItem(index)">删除</button>
      </li>
    </ul>
    {{shopArry}}
    总价格：{{sunCost}}
    <!-- <input type="checkbox" v-model="test" :value="1"> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      // test: true,
      allChosen: false,
      shopArry: [],
      shopCarData: [
        { name: '卡券', price: 20, quality: 5 },
        { name: '实物', price: 10, quality: 5 },
        { name: '红包', price: 5, quality: 5 }
      ]
    };
  },
  filters: {
    // filterValue (value) {
    //   if (value < 1) {
    //     value = 1;
    //   } else if (value > 999) {
    //     value = 999;
    //   }
    // }
  },
  computed: {
    sunCost () {
      let sumMoney = 0;
      for (let index in this.shopArry) {
        sumMoney += this.shopArry[index].price * this.shopArry[index].quality;
      }
      return sumMoney;
    }
  },
  methods: {
    changeAll () {
      console.log(this.allChosen);
      if (this.allChosen) {
        this.shopArry = this.shopCarData;
      } else {
        this.shopArry = [];
      }
    },
    itemChange (shopArry) {
      if (shopArry.length === this.shopCarData.length) {
        this.allChosen = true;
      } else {
        this.allChosen = false;
      }
      console.log(this.shopArry);
      console.log(this.shopCarData.length);
    },
    reduce (item) {
      item.quality--;
      if (item.quality < 1) {
        item.quality = 1;
      }
    },
    add (item) {
      item.quality++;
      if (item.quality > 999) {
        item.quality = 999;
      }
    },
    deleteItem (index) {
      // let tempArry = this.shopArry.map(item => {
      //   if (this.shopCarData[index].name === item.name) {

      //   }
      //   return item.name !== this.shopCarData[index];
      // });
      for (let i in this.shopArry) {
        if (this.shopArry[i].name === this.shopCarData[index].name) {
          this.shopArry.splice(i, 1);
        }
      }
      this.shopCarData.splice(index, 1);
      console.log(this.shopArry);
      // this.shopArry = tempArry;
    }
  }
};
</script>
<style lang="less" scoped>
</style>
