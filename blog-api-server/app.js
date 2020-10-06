(async function run() {
    const Koa = require('koa2')
    const Router = require('koa-router')
    const Mysql = require('promise-mysql2')
    const Body = require('koa-body')
    const app = new Koa()
    const router = new Router()
    const cors = require("koa2-cors")
    app.use(cors()) //解决跨域问题
    const staticServer = require('koa-static');
    app.use(staticServer(__dirname , 'static'));
    app.use(Body())
   
    const con = await Mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port:'3308',
        password: '123456',
        database: 'blog'
    })

//获取所有最新的文章
router.get('/blogAllData',async ctx =>{
    const sql = `SELECT * FROM article`
    const [data] = await con.query(sql)
    console.log(data);
  if(data.length >= 0 ){
    ctx.body = {
        code:200,
        tips:'获取数据成功',
        data
    }
}else{
    ctx.body = {
        code:400,
        tips:'获取数据失败'
    } 
}
})




app.use(router.routes())
app.listen(80,() => {                                                                          
    console.log('app start')
})
})()