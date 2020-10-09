import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'



Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home},
  ]
})

export default router
