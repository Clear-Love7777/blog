const Router = require("koa-router")
const Mysql = require("promise-mysql2")
const blog = require("./mysql.js")

const index = new Router() 
//获取所有最新的文章
index.post('/blogAllData',async ctx =>{
    const pagenum = ctx.request.body.pagenum - 1
    const pagesize = ctx.request.body.pagesize
    const query = ctx.request.body.query
    const con = await Mysql.createConnection(blog)//连接数据库
    if(query == '' || query == null){
        var sql = `SELECT a.id,a.date,a.title,a.date,
        a.content,a.sortId,a.labelId,b.sort,
        c.label FROM article a,sort b,label c 
        WHERE a.sortId = b.id and a.labelId = c.id
        LIMIT ${pagenum * pagesize},${pagesize}`
        var [data] = await con.query(sql)
    }else{
        var sql = `SELECT a.id,a.date,a.title,a.date,
        a.content,a.sortId,a.labelId,b.sort,
        c.label FROM article a,sort b,label c 
        WHERE a.sortId = b.id and a.labelId = c.id and a.title like '%${query}%'
        LIMIT ${pagenum * pagesize},${pagesize}`
       var [data] = await con.query(sql)
    }
    const sql2 = `SELECT * FROM article`
    const [data2] = await con.query(sql2)
    con.end(function (err) { }) //连接结束
    //  console.log(data2);
  if(data.length >= 0 && data2.length>=0){
    ctx.body = {
        code:200,
        tips:'获取数据成功',
        data,
        total:data.length
    }
}else{
    ctx.body = {
        code:400,
        tips:'获取数据失败'
    } 
}
})

//获取分类
index.get('/getSort',async ctx =>{
    const con = await Mysql.createConnection(blog)//连接数据库
    const sql = `SELECT * FROM sort`
  const [data] = await con.query(sql)
  con.end(function (err) { }) //连接结束
  if(data.length >= 0){
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
//获取标签
index.get('/getLabel',async ctx =>{
    const con = await Mysql.createConnection(blog)//连接数据库
    const sql = `SELECT * FROM label`
  const [data] = await con.query(sql)
  con.end(function (err) { }) //连接结束
  if(data.length >= 0){
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
//获取最新文章
index.get('/getNewArticles',async ctx =>{
    const con = await Mysql.createConnection(blog)//连接数据库
    const sql = `SELECT * FROM article`
  const [data] = await con.query(sql)
  con.end(function (err) { }) //连接结束
  if(data.length >= 0){
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

module.exports = index