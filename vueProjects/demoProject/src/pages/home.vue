<template>
    <div class="page-home">
        <button v-for="(item, index) in buttonArr" 
                :key="index"
                @click="$router.push({name: item.routerName})"
                class="router-button"
        >{{ item.text }}</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            buttonArr: [
                {
                    text: '富文本',
                    routerName: 'editor'
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
    
</style>