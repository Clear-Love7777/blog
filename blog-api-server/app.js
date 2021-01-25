(async function run() {
  const Koa = require('koa2')
  const jwt = require("jsonwebtoken")
  const Router = require('koa-router')
  const Mysql = require('promise-mysql2')
  const Static = require('koa-static-cache')
  const blog = require("./mysql.js")
  const  koaBody = require('koa-body')
  const cors = require("koa2-cors")

  const app = new Koa()
  const router = new Router()

  app.use(cors()) //解决跨域问题
  
  const staticServer = require('koa-static');
  app.use(staticServer(__dirname, 'static'));
   app.use(koaBody({ multipart: true })) //支持文件上传
  app.use(Static("./static", { //加载静态资源
    prefix: "/static",
    gzip: true,
}))

  app.use(async (ctx, next) => { //后台拦截器
    var token = ctx.headers.authorization
    const url = ctx.request.url
    // const url = ctx.request.url.split('?')[0]
    // console.log(url);
    // console.log(token);
    if (url !== '/updateblog' && url !== '/addblog' && url !== '/addcount' &&
      url !== '/addSort' && url !== '/deleteSort' && url !== '/editSort' &&
      url !== '/addLabel' && url !== '/deleteLabel' && url !== '/editLabel' &&
      url !== '/deleteArticle' && url !== '/postcomment' && url !== '/deleteComment'  
      && url !== '/deleteTasks' && url !== '/editCheat'&& url !== '/editMessages' && url !== '/deleteMessage'
      && url !== '/editLinks' && url !== '/deleteLink') {
      return await next()
    }


    if ((url === '/updateblog' || url === '/addblog' || url === '/addcount' ||
        url === '/addSort' || url === '/deleteSort' || url === '/editSort' ||
        url === '/addLabel' || url === '/deleteLabel' || url === '/editLabel' ||
        url === '/deleteArticle' || url === '/postcomment' || url === '/deleteComment'
        || url === '/deleteTasks' || url === '/editCheat' || url === '/editMessages' || url === '/deleteMessage'
        || url === '/editLinks' || url === '/deleteLink') && (token !== 'null')) {
      jwt.verify(token, 'I_LOVE_LIFE', (error, decoded) => {
        if (error) {
          return ctx.body = {
            code: '445',
            tips: "token无效",
          }
        }
      })
      await next()
    }

    if ((url === '/updateblog' || url === '/addblog' || url === '/addcount' ||
        url === '/addSort' || url === '/deleteSort' || url === '/editSort' ||
        url === '/addLabel' || url === '/deleteLabel' || url === '/editLabel' ||
        url === '/deleteArticle' || url === '/postcomment' || url === '/deleteComment' 
         || url === '/deleteTasks' || url === '/editCheat'|| url === '/editMessages' || url === '/deleteMessage'
         || url === '/editLinks' || url === '/deleteLink' ) && (token == 'null')) {
      return ctx.body = {
        code: '444',
        tips: "该功能只有登录用户可以使用",
      }
    }
  })


  const blogmanage = require("./router/blogmanage.js")
  app.use(blogmanage.routes())

  const index = require("./index.js")
  app.use(index.routes())

  const share = require("./share.js")
  app.use(share.routes())

  const other = require("./other.js")
  app.use(other.routes())

  const user = require("./user.js")
  app.use(user.routes())

  // app.use(router.routes())
  // app.listen(9025,() => {                                                                          
  //   console.log('app start')
  // })
  // })()

  app.use(router.routes())
  app.listen(80, () => {
    console.log('app start')
  })
})()