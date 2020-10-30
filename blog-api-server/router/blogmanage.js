const Router = require("koa-router")
const Mysql = require("promise-mysql2")
const blog = require("../mysql.js")
const jwt = require("jsonwebtoken")
const blogmanage = new Router()

//登录
blogmanage.post('/login', async ctx => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const userdata = {
        name: username,
        pwd: password
    }
    const secret = "jun"
    const con = await Mysql.createConnection(blog)
    var sql = `SELECT * FROM admin where username = '${username}' and password= '${password}'`
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.length > 0) {
        ctx.body = {
            code: 200,
            tips: '登录成功',
            token: jwt.sign(userdata, secret)
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '登录失败'
        }
    }
})

//添加分类
blogmanage.post('/addSort', async ctx => {
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

//删除分类接口
blogmanage.delete('/deleteSort', async ctx => {
    const id = ctx.request.query.id;
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM sort WHERE sort.id = '${id}'`;
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

});
//编辑分类
blogmanage.put('/editSort', async ctx => {
    const edit = ctx.request.body;
    const con = await Mysql.createConnection(blog)
    const sql =
        `UPDATE sort SET sort_name='${edit.sort_name}' WHERE id='${edit.id}';`
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '修改成功',
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '修改失败'
        }
    }

});
//添加标签
blogmanage.post('/addLabel', async ctx => {
    const name = ctx.request.body.label_name.trim()
    const con = await Mysql.createConnection(blog)
    const [data] = await con.query(`SELECT label_name FROM label`)
    con.end(function (err) {}) //连接结束
    var code, tips
    data.some(item => {
        if (item.label_name === name) {
            code = 201
            tips = '标签重复'
            return true
        }
    })
    if (code != 201) {
        const con = await Mysql.createConnection(blog)
        const sql = `INSERT INTO label (label_name) VALUE ('${name}')`
        const [rs] = await con.query(sql)
        con.end(function (err) {}) //连接结束
        if (rs.affectedRows > 0) {
            code = 200,
                tips = '添加标签成功'
        } else {
            code = 400,
                tips = '添加标签失败'
        }
    }

    ctx.body = {
        code,
        tips
    }
})
//删除标签接口
blogmanage.delete('/deleteLabel', async ctx => {
    const id = ctx.request.query.id;
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM label WHERE label.id = '${id}'`;
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.affectedRows > 0) {
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

});
//编辑标签
blogmanage.put('/editLabel', async ctx => {
    const edit = ctx.request.body;
    const con = await Mysql.createConnection(blog)
    const sql =
        `UPDATE label SET label_name='${edit.label_name}' WHERE id=${edit.id};`
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '修改成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '修改失败'
        }
    }

});
//删除博客接口
blogmanage.delete('/deleteArticle', async ctx => {
    const id = ctx.request.query.id;
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM article WHERE article.id = '${id}'`;
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.affectedRows > 0) {
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

});
//删除评论接口
blogmanage.delete('/deleteComment', async ctx => {
    const id = ctx.request.query.id;
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM comment WHERE comment.id = '${id}'`;
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

});

//编辑留言
blogmanage.put('/editMessages', async ctx => {
    const edit = ctx.request.body;
    const con = await Mysql.createConnection(blog)
    const sql = `UPDATE message SET nickname= '${edit.nickname}',create_time = '${edit.create_time}'
    ,content = '${edit.content}',email = '${edit.email}',reply= '${edit.reply}' WHERE id= '${edit.id}'`;
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '修改成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '修改失败'
        }
    }
})
//删除留言
blogmanage.delete('/deleteMessage', async ctx => {
    const id = ctx.request.query.id;
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM message WHERE message.id = '${id}'`;
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

//编辑友链
blogmanage.put('/editLinks', async ctx => {
    const edit = ctx.request.body;
    const con = await Mysql.createConnection(blog)
    const sql = `UPDATE link SET linkname= '${edit.linkname}',introduction = '${edit.introduction}'
    ,href = '${edit.href}',email = '${edit.email}' WHERE id= '${edit.id}'`;
    const [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (data.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '修改成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '修改失败'
        }
    }
})

//删除友链
blogmanage.delete('/deleteLink', async ctx => {
    const id = ctx.request.query.id;
    const con = await Mysql.createConnection(blog)
    const sql = `DELETE FROM link WHERE link.id = '${id}'`;
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

module.exports = blogmanage