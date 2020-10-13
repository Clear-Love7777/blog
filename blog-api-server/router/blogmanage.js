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

//添加分类
blogmanage.post('/addsort', async ctx => {
    const name = ctx.request.body.sort_name.trim()
    const con = await Mysql.createConnection(blog)
    const [data] = await con.query(`SELECT sort_name FROM sort`)
    con.end(function (err) {}) //连接结束
    var code, tips
    data.some(item => {
        if (item.sort_name === name) {
            code = 201
            tips = '分类重复'
            return true
        }
    })
    if (code != 201) {
        const con = await Mysql.createConnection(blog)
        const sql = `INSERT INTO sort (sort_name) VALUE ('${name}')`
        const [rs] = await con.query(sql)
        con.end(function (err) {}) //连接结束
        if (rs.affectedRows > 0) {
            code = 200,
            tips = '添加分类成功'
        } else {
            code = 400,
            tips = '添加分类失败'
        }
    }

    ctx.body = {
        code,
        tips
    }
})





module.exports = blogmanage