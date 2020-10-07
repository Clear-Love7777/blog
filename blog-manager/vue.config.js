module.exports = {
    //打包时需是相对路径
    publicPath: './',
    // devServer: {
    //   proxy: {
    //     '/Api': {
    //       //你要跨域的域名(包含host、端口号,切记：一定要带上http头);同一个域名只能设置一次跨域，否则重复报错！
    //       target: 'https://img.abcyun.co',
    //       changeOrigin: true, //是否跨域，设置为true;(必须)
    //       pathRewrite: {
    //         '^/Api': '/api'
    //       }
    //     }
    //   }
    // },
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
  