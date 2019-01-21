import Vue from 'vue'
import App from './App.vue'

//element ui 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false
import './assets/base.css';

import store from './lib/store';
import router from './lib/router';

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
