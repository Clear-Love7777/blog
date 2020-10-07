import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',
    component:Home,
    redirect:'/index',
    children:
   [{path: '/index', component:Index},
  ]
  },
  ]
})

export default router
