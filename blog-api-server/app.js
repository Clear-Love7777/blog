(async function run() {
    const Koa = require('koa2')
    const Router = require('koa-router')
    const Mysql = require('promise-mysql2')
    const blog = require("./mysql.js")
    const Body = require('koa-body')
    const app = new Koa()
    const router = new Router()
    const cors = require("koa2-cors")
    app.use(cors()) //解决跨域问题
    const staticServer = require('koa-static');
    app.use(staticServer(__dirname , 'static'));
    app.use(Body())
   



const blogmanage = require("./router/blogmanage.js")
app.use(blogmanage.routes())

const index = require("./index.js")
app.use(index.routes())

// app.use(router.routes())
// app.listen(9025,() => {                                                                          
//     console.log('app start')
// })
// })()
app.use(router.routes())
app.listen(80,() => {
    console.log('app start')
})

})()