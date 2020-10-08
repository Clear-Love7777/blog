const Router = require("koa-router")
const Mysql = require("promise-mysql2")
const blog = require("../mysql.js")

const blogmanage = new Router() 

//登录
blogmanage.post('/login',async ctx => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const con = await Mysql.createConnection(blog)
    var sql = `SELECT * FROM admin where username = '${username}' and password= '${password}'`
    const [data] = await con.query(sql)
    con.end(function (err) { }) //连接结束

    console.log(data)
    if(data.length > 0){
        ctx.body = {
            code:200,
            tips:'登录成功',
            id :data[0].id
        }
    }else{
        ctx.body = {
            code:400,
            tips:'登录失败'
        } 
    }
})






module.exports = blogmanage