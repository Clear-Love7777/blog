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
     // console.log(data);
    const name = ctx.request.body.nickname
    const time = ctx.request.body.date
    const content = ctx.request.body.content
    const email = ctx.request.body.email
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
//获取友情链接
other.get('/getLinkList',async ctx =>{
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql =`SELECT * FROM link`
    const [data] = await con.query(sql)
    con.end(function(err){})  //连接结束
    if(data.length>=0){
        ctx.body = {
            code:200,
            tips:"获取数据成功",
            data
        }
    }else{
        ctx.body = {
            code:400,
            tips:"获取数据失败"
        }
    }
})
//申请友链
other.post('/submitLinks', async ctx =>{
    // const data = ctx.request.body;
    // console.log(data);
    const name = ctx.request.body.linkname;
    const introduction = ctx.request.body.introduction;
    const href = ctx.request.body.href;
    const email = ctx.request.body.email;
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql =`INSERT INTO link (linkname,introduction,href,email) VALUE
    ('${name}','${introduction}','${href}','${email}')` 
    const [rs] = await con.query(sql)
    con.end(function(err){}) //连接结束
    if(rs.affectedRows >0){
        ctx.body = {
            code:200,
            tips:'申请成功'
        }
    }else{
        ctx.body = {
            code:400,
            tips:'申请失败'
        }
    }
})

//博客浏览量排行榜
other.get('/topViews',async ctx => {
    const connection = await Mysql.createConnection(blog)
    const sql = `SELECT id,title,date,mdname,readcount FROM article ORDER BY readcount DESC LIMIT 0,5`
    const [data] = await connection.query(sql)
    connection.end(function (err) { }) //连接结束

    if (data.length >= 0) {
        ctx.body = {
            data,
            code:200,
            tips:'获取数据成功'
        }
    } else {
        ctx.body = {
            code:400,
            tips:'获取数据失败'
        }
    }
})
//博客点赞排行榜
other.get('/topThumbs',async ctx => {
    const connection = await Mysql.createConnection(blog)
    const sql = `SELECT id,title,date,mdname,count FROM article ORDER BY count DESC LIMIT 0,5`
    const [data] = await connection.query(sql)
    connection.end(function (err) { }) //连接结束

    if (data.length >= 0) {
        ctx.body = {
            data,
            code:200,
            tips:'获取数据成功'
        }
    } else {
        ctx.body = {
            code:400,
            tips:'获取数据失败'
        }
    }
})

//博客评论排行榜
other.get('/topComments',async ctx => {
    const connection = await Mysql.createConnection(blog)
    const sql = `SELECT id,date,content,count FROM blog_comment ORDER BY count DESC LIMIT 0,5`
    const [data] = await connection.query(sql)
    connection.end(function (err) { }) //连接结束

    if (data.length >= 0) {
        ctx.body = {
            data,
            code:200,
            tips:'获取数据成功'
        }
    } else {
        ctx.body = {
            code:400,
            tips:'获取数据失败'
        }
    }
})
















module.exports = other