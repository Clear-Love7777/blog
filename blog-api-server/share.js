const Router = require("koa-router")
const Mysql = require("promise-mysql2")
const blog = require("./mysql.js")

const share = new Router()
//获取任务
share.get('/getTasks', async ctx => {
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `SELECT * FROM  cheat`
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.length >= 0) {
        ctx.body = {
            code: 200,
            tips: '获取数据成功',
            data
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取数据失败'
        }
    }
})

//添加任务
share.post('/addTasks', async ctx => {
    const data = ctx.request.body
    const value = ctx.request.body.value
    const isDone = ctx.request.body.isDone
    const isEditing = ctx.request.body.isEditing
    const date = ctx.request.body.date
    // console.log(data);
    const con = await Mysql.createConnection(blog)
    const sql = `INSERT INTO cheat (value,isDone,date) VALUE
    ('${value}','${isDone}','${date}')`
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '添加任务成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '添加任务失败'
        }
    }

})
// 删除任务
share.delete('/deleteTasks', async ctx => {
    const id = ctx.request.query.id;
    // console.log(id);
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM cheat WHERE cheat.id = '${id}'`;
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '删除成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '删除失败'
        }
    }

})
// 编辑任务
share.put('/editCheat', async ctx => {
    const edit = ctx.request.body;
    // console.log(edit);
    const con = await Mysql.createConnection(blog)
    const sql = `UPDATE cheat SET value = '${edit.value}',date = '${edit.date}' WHERE id= '${edit.id}';`
    const [rs] = await con.query(sql) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '修改成功',
            rs
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '修改失败'
        }
    }
})
//改变状态
share.put('/doneIt',async ctx =>{
    const isDone = ctx.request.body.isDone;
    const id = ctx.request.body.id;
    console.log(id,isDone);
    const con = await Mysql.createConnection(blog)
    const sql = `UPDATE cheat SET isDone = '${isDone}' WHERE id=${id}`
    const [data] =await con.query(sql)
    con.end(function(err){}) //连接结束
    if(data.affectedRows>0){
        ctx.body = {
            code:200,
            tips:'修改成功'
        }
    }else{
        ctx.body = {
            code:400,
            tips:'修改失败'
        }
    }
})


















module.exports = share