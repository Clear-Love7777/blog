// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './assets/css/global.css'
import './assets/css/atom-one-dark.css'


Vue.config.productionTip = false
Vue.prototype.$http = axios
// axios.defaults.baseURL='http://47.103.205.245:9025/'
axios.defaults.baseURL='http://127.0.0.1:80/'


//自定义代码高亮事件
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
