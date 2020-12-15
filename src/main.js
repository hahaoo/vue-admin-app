import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible.js'
Vue.config.productionTip = false
import { Lazyload } from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
