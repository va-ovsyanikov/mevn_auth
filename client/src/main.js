import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'



Vue.config.devtools = true;
Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(Notifications)
new Vue({
  router,
  store,
  created() {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
        store.dispatch.LOGOUT
      }
      return Promise.reject(error);
    });
  },
  render: h => h(App)
  
}).$mount('#app')
