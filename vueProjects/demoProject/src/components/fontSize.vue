<template>
    <div class="big">
        <!-- <div @click="$emit('bigFont',50)">点击我放大父组件的文字大小</div> -->
        <div @click="$emit('update:title','这是新的标题')">点击我改变标题</div>
        <slot name="slot1"></slot>
        <slot name="slot2"></slot>
        <div>1111{{ camelData }}</div>
    <!-- <div>{{test2}}</div> -->
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
    props: {
        camelData: {
            type: String,
            default: 'gogogo'
        }
    },
    data () {
        return {
            test: 2
        };
    }
};
</script>
<style lang="less" scoped>
.big {
  font-size: 20px;
}
</style>
