import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios';

import url from "../public/config/api-config";

axios.defaults.baseURL = '/api';

Vue.prototype.$axios = axios;
Vue.prototype.$url = url;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
