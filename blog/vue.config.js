module.exports = {
    devServer:{
    //自动打开浏览器
    open:true
},
chainWebpack: config => {
    //在html页面引用的配置
    config.set('externals', {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      nprogress: 'NProgress',
      'element-ui': 'ELEMENT'
    })
  }
}