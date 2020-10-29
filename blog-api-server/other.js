const Router = require("koa-router")
const Mysql = require("promise-mysql2")
const blog = require("./mysql.js")
const other = new Router()

//获取留言
other.get('/getMessages',async ctx =>{
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `SELECT * FROM message`
    const [data] = await con.query(sql)
    con.end(function(err){})  //连接结束
    if(data.length>=0){
        ctx.body = {
            code:200,
            tips:'获取数据成功',
            data,
            total: data.length
        }
    }else{
        ctx.body  = {
            code:400,
            tips:'获取数据失败'
        }
    }
})
//留言
other.post('/submitAllMessage',async ctx=>{
    // const data = ctx.request.body
    const name = ctx.request.body.nickname
    const time = ctx.request.body.date
    const content = ctx.request.body.content
    const email = ctx.request.body.email
    // console.log(data);
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `INSERT INTO message (nickname,create_time,content,email) VALUE
    ('${name}','${time}','${content}','${email}')`
    const [rs] = await con.query(sql)
    con.end(function(err){}) //连接结束
    if(rs.affectedRows>0){
        ctx.body = {
            code:200,
            tips:'留言成功'
        }
    }else{
        ctx.body = {
            code:400,
            tips:'留言失败'
        }
    }
})




















module.exports = other