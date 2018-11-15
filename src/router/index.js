import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/page/Content'
import SingleImage from '../components/page/SingleImage'
import UserContent from '../components/page/UserContent'
import Login from '../components/page/Login'
import AdminLogin from '../components/page/AdminLogin'
import TagQueryResult from '../components/page/TagQueryResult'
import AcgContent from '../components/page/AcgContent'
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
    },
    {
      name:'TagQueryResult',
      path:'/tagqueryresult',
      component:TagQueryResult
    },
    {
      name:'AcgContent',
      path:'/acgcontent',
      component:AcgContent
    }
  ]
})
