// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Articles from '../components/Articles.vue'
import Content from '../components/Content.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home,
    redirect:'/articles',
   children:[
     {path:'/articles',component:Articles},
     {path:'/content',component:Content},
   ]
  },
  ]
})

export default router
