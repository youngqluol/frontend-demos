<template>
    <div>
        111
        {{ test | vueFilter }}
        <transition name="fade">
            <div v-if="go">看我怎么没的</div>
        </transition>
        <div @click="go = !go">点我</div>
    </div>
</template>
<script>
export default {
    filters: {
        testFilter: function (value) {
            if (value.split('').length > 4) {
                value =
                    value
                        .split('')
                        .slice(0, 4)
                    .join('') + '...';
            }
            return value;
        }
    // test: function (value) {
    //   return value.charAt()
    // }
    },
    data () {
        return {
            test: 1000,
            go: false
        };
    }
    // async mounted () {
    //   this.getTableData();
    //   await this.$nextTick();
    //   this.dragSort();
    // }
};
</script>
<style lang="less" scoped>
.fade-enter,
.fade-leave-to {
  transform: translate(50px, 50px);
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s ease-in;
}
.fade-leave-active {
  transition: all 0.5s ease-out;
}
</style>
