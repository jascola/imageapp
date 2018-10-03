// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
import VueLazyload from 'vue-lazyload'
import live2d4vue from 'live2d4vue'

Vue.use(live2d4vue);
Vue.use(VueLazyload);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

