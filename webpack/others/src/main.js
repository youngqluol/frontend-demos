import Vue from 'vue';
import store from './store';
import router from './router';
import App from './app.vue';
import OpPopup from '@act-block/popup'

Vue.use(OpPopup);

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})