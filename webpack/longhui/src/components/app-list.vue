<template>
  <div class="app-list">
    <div class="title">{{apps.cardTitle}}</div>
    <app v-for="app in apps.positionListList" :key="app.index" :app="app.exclusiveList[0]"></app>
  </div>
</template>

<script>
import App from './download-app.vue';

export default {
    components: {
        App
    },
    props: {
      apps: {
        type: Object,
        default() {
          return []
        }
      }
    }
};
</script>

<style lang="stylus" scoped>
.app-list {
    margin: 0 8px 20px;
    padding: 0 8px;
    background: #f1f1f1;
    border-radius: 5px;
}
.title {
    padding: 7px 0;
    font-size: 15px;
    color: #434343;
}
</style>