// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Articles from '../components/Articles.vue'
import Content from '../components/Content.vue'
import Share from '../components/Share.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Comment from '../components/Comment.vue'
import Beauty from '../components/Beauty.vue'
import Introduction from '../components/Introduction.vue'
import Cheat from '../components/Cheat.vue'
import Recognition from '../components/Recognition.vue'


Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:Home,
    redirect:'/articles',
   children:[
     {path:'/articles',component:Articles},
     {path:'/content',component:Content},
     {path:'/comment',component:Comment},
   ]
  },
  {path:'/share',component:Share,
  redirect:'/introduction',
  children:[
    {path:'/introduction',component:Introduction},
    {path:'/beauty',component:Beauty},
    {path:'/cheat',component:Cheat},
    {path:'/recognition',component:Recognition},
  ]
},
  {path:'/login',component:Login},
  {path:'/register',component:Register},

  ]
})

export default router
