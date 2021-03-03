// import Vue from 'vue'
// import VueRouter from 'vue-router'
const Home = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Home.vue')
const Articles = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Articles.vue')
const Content = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Content.vue')
const Other = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Other.vue')
const Login = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Login.vue')
const Register = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Register.vue')
const Editpassword = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Editpassword.vue')
const Comment = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Comment.vue')
const Introduction = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Introduction.vue')
const Cheat = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Cheat.vue')
const MessageBoard = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/MessageBoard.vue')
const Header = () => import( /* webpackChunkName: "homepage_notfound" */ '../publicvue/Header.vue')
const Editor = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Editor.vue')
const Link = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Link.vue')
const Self = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Self.vue')
const ReSetPwd = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/ReSetPwd.vue')
const HotTop = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/HotTop.vue')







Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/articles',
    children: [{
        path: '/articles',
        component: Articles
      },
      {
        path: '/content',
        component: Content
      },
      {
        path: '/comment',
        component: Comment
      },
    ]
  },
  {
    path: '/other',
    component: Other,
    redirect: '/introduction',
    children: [{
        path: '/introduction',
        component: Introduction
      },
      {
        path: '/cheat',
        component: Cheat
      },
      {
        path:'/hotTop',
        component:HotTop
      },
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/editpassword',
    component: Editpassword
  },
  {
    path:'/messageBoard',
    component:MessageBoard
  },
  {
    path:'/header',
    component:Header
  },
  {
    path:'/editor',
    component:Editor
  },
  {
    path:'/link',
    component:Link
  },
  {
    path:'/self',
    component:Self
  },
  {
    path:'/resetpwd',
    component:ReSetPwd
  },
 
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router