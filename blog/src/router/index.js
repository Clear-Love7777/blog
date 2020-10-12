// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Articles from '../components/Articles'



Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home,
    redirect:'/articles',
   children:[
     {path:'/articles',component:Articles}
   ]
  },
  ]
})

export default router
