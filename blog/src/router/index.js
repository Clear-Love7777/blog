// import Vue from 'vue'
// import VueRouter from 'vue-router'

const Home = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Home.vue')
const Articles = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Articles.vue')
const Content = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Content.vue')
const Other = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Other.vue')
const Login = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Login.vue')
const Register = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Register.vue')
const Comment = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Comment.vue')
const Introduction = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Introduction.vue')
const Cheat = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Cheat.vue')
const MessageBoard = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/MessageBoard.vue')
const Header = () => import( /* webpackChunkName: "homepage_notfound" */ '../public/Header.vue')
const Editor = () => import( /* webpackChunkName: "homepage_notfound" */ '../components/Editor.vue')




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
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router