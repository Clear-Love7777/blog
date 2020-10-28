module.exports = {
  devServer: {
    //自动打开浏览器
    open: true
  },
  chainWebpack: config => {
    //在html页面引用的配置
    config.set('externals', {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'jquery': '$',
      nprogress: 'NProgress',
      'element-ui': 'ELEMENT'
    })
  }, 
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }
}