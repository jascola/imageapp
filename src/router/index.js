import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content'
import SingleImage from '../components/SingleImage'
import HelloWorld from '../components/HelloWorld'
import Vuex from 'vuex'

Vue.use(Router);
Vue.use(Vuex);
export default new Router({
  routes: [
    {
      path: '/',
      component: Content
    },
    {
      name: 'SingleImage',
      path: '/singleImage',
      component: SingleImage
    }
    ,
    {
      name:'HelloWorld',
      path: '/hello',
      component:HelloWorld
    }
  ]
})
