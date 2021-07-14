<template>
    <div>
        <keep-alive>
            <component :is="componentId"></component>
        </keep-alive>
        <div @click="changeComp">点击切换组件</div>
    </div>
</template>
<script>
export default {
    components: {
        optionsCard: () => import('./optionsCard'),

        shopCar: () => import('./shopCar')
    },
    data () {
        return {
            componentId: 'optionsCard'
        };
    },
    methods: {
        changeComp () {
            if (this.componentId === 'optionsCard') {
                this.componentId = 'shopCar';
            } else {
                this.componentId = 'optionsCard';
            }
        }
    }
};
</script>
<style lang="less" scoped>
</style>
