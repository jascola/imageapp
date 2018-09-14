import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content'
import SingleImage from '../components/SingleImage'
import UserContent from '../components/UserContent'
import Login from '../components/Login'
import AdminLogin from '../components/AdminLogin'
import Vuex from 'vuex'

Vue.use(Router);
Vue.use(Vuex);
export default new Router({
  routes: [
    {
      name:'UserContent',
      path: '/',
      component: UserContent
    },
    {
      name: 'SingleImage',
      path: '/singleImage',
      component: SingleImage
    }
    ,
    {
      name:'Content',
      path: '/content',
      component:Content
    },
    {
      name:'Login',
      path:'/login',
      component:Login
    },
    {
      name:'AdminLogin',
      path:'/adminlogin',
      component:AdminLogin
    }
  ]
})
