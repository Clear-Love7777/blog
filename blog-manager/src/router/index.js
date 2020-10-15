import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import Welcome from '../components/Welcome.vue'
import Allarticles from '../components/Allarticles.vue'
import Sortmessages from '../components/Sortmessages.vue'
import Labelmessages from '../components/Labelmessages.vue'
import Publishblog from '../components/Publishblog.vue'
Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {path: '/',redirect:'/login'},
    {path: '/login', component:Login},
    {path:'/admin',
     component:Admin,
     redirect:'/welcome',
     children:
     [
     {path: '/welcome',component: Welcome},
     {path:'/allarticles',component:Allarticles},
     {path:'/sortmessages',component:Sortmessages},
     {path:'/labelmessages',component:Labelmessages},
     {path:'/publishblog',component:Publishblog},
  ]
  }
  ]
})








// 挂载路由导航守卫,控制访问权限
router.beforeEach((to, from, next) => {
  // 如果用户访问登录页，直接放行，next
  if (to.path === '/login') {
    return next()
  }
  // 用户不是访问登录页，获取浏览器sessionStroage中的token
  // 存在的的话，放行，
  // 不存在的话，跳转至登录页
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    // 不存在
    return next('/login')
  } else {
    // 存在
    return next()
  }
})


export default router
