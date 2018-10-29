import '@babel/polyfill';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import '@/plugins/vuetify';
import App from './App.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
