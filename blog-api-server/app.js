(async function run() {
    const Koa = require('koa2')
    const Router = require('koa-router')
    const Mysql = require('promise-mysql2')
    const Body = require('koa-body')
    const app = new Koa()
    app.use(Body())
    const router = new Router()
    const cors = require("koa2-cors")
    app.use(cors()) //解决跨域问题
    const staticServer = require('koa-static');
    app.use(staticServer(__dirname , 'static'));
   
    const con = await Mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port:'3308',
        password: '123456',
        database: 'blog'
    })

app.use(router.routes())
app.listen(80,() => {                                                                          
    console.log('app start')
})
})()