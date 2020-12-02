const Router = require("koa-router")
const Mysql = require("promise-mysql2")
const blog = require("./mysql.js")
const jwt = require("jsonwebtoken")

const index = new Router()
//获取所有最新的文章
index.post('/blogAllData', async ctx => {
    const pagenum = ctx.request.body.pagenum - 1
    const pagesize = ctx.request.body.pagesize
    const query = ctx.request.body.query
    const con = await Mysql.createConnection(blog) //连接数据库
    if (query == '' || query == null) {
        var sql = `SELECT a.id,a.date,a.title,a.date,
        a.content,a.sortId,a.labelId,a.introduce,a.mdname,a.count,a.readcount,b.sort_name,
        c.label_name FROM article a,sort b,label c 
        WHERE a.sortId = b.id and a.labelId = c.id
        LIMIT ${pagenum * pagesize},${pagesize}`
        var [data] = await con.query(sql)
    } else {
        var sql = `SELECT a.id,a.date,a.title,a.date,
        a.content,a.sortId,a.labelId,a.introduce,a.mdname,a.count,a.readcount,b.sort_name,
        c.label_name FROM article a,sort b,label c 
        WHERE a.sortId = b.id and a.labelId = c.id and a.title like '%${query}%'
        LIMIT ${pagenum * pagesize},${pagesize}`
        var [data] = await con.query(sql)
    }
    const sql2 = `SELECT * FROM article`
    const [data2] = await con.query(sql2)
    con.end(function (err) {}) //连接结束
    if (data.length >= 0 && data2.length >= 0) {
        ctx.body = {
            code: 200,
            tips: '获取数据成功',
            data,
            total: data2.length
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取数据失败'
        }
    }
})

//获取分类
index.get('/getSort', async ctx => {
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `SELECT * FROM sort`
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
//获取所有与指定分类有关的博客数据
index.get('/getAboutSortData', async ctx => {
    const id = ctx.request.query.id

    const con = await Mysql.createConnection(blog)
    var sql = `SELECT a.id,a.date,a.title,a.readcount,
                    a.content,a.sortId,a.labelId,a.introduce,a.mdname,a.count,b.sort_name,
                 c.label_name FROM article a,sort b,label c 
                 WHERE a.sortId = '${id}' and a.sortId = b.id and a.labelId = c.id`
    var [data] = await con.query(sql)
    con.end(function (err) {}) //连接结束

    if (data.length >= 0) {
        ctx.body = {
            data,
            code: 200,
            tips: '获取数据成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取数据失败'
        }
    }
})
//获取标签
index.get('/getLabel', async ctx => {
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `SELECT * FROM label`
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
//获取最新文章
index.get('/getNewArticles', async ctx => {
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `SELECT * FROM article`
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
//获取评论
index.get('/getComment', async ctx => {
    const con = await Mysql.createConnection(blog) //连接数据库
    const sql = `SELECT * FROM comment`
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

//更新博客
index.put('/updateblog', async ctx => {
    const data = ctx.request.body
    const con = await Mysql.createConnection(blog)
    const sql = `UPDATE article SET  date='${data.date}',title='${data.title}',content='${data.content}',
                sortId=${data.sort_name},labelId=${data.label_name},
                introduce='${data.introduce}',mdname='${data.mdname}'WHERE id = ${data.id}`
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '更新博客成功',
            data
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '更新博客失败',
        }
    }
})

//获取分类、标签表的所有数据
index.get('/blogdatadetail', async ctx => {
    const con = await Mysql.createConnection(blog)
    const sql = `SELECT * FROM sort`
    const sql2 = `SELECT * FROM label`
    const [data] = await con.query(sql)
    const [data2] = await con.query(sql2)
    con.end(function (err) {}) //连接结束

    if (data.length >= 0 && data2.length >= 0) {
        ctx.body = {
            data: {
                data,
                data2
            },
            code: 200,
            tips: '获取数据成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取数据失败'
        }
    }

})

//添加博客
index.post('/addblog', async ctx => {
    const data = ctx.request.body
    var con = await Mysql.createConnection(blog)
    const sql = `INSERT INTO article (title,introduce,date,sortId,mdname,labelId,content,count,readcount) VALUE
    ('${data.title}', '${data.introduce}', '${data.date}', '${data.sortname}', 
    '${data.mdname}', '${data.labelname}', '${data.content}', '${data.count}','${data.readcount}')`
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束

    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '添加博客成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '添加博客失败'
        }
    }
})
//根据mdname获取博客内容
index.get('/readmd/:name', async ctx => {
    const name = ctx.params.name
    const con = await Mysql.createConnection(blog)
    const [data] = await con.query(`SELECT content FROM article where mdname = '${name}'`)
    con.end(function (err) {}) //连接结束
    if (data.length > 0) {
        ctx.body = {
            data,
            code: 200,
            tips: '获取博客成功'
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取博客失败'
        }
    }
})
//用户登录
index.post('/userLogin', async ctx => {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const userdata = {
        name: username,
        pwd: password
    }
    const secret = "jun"
    const con = await Mysql.createConnection(blog)
    var sql = `SELECT * FROM user where username = '${username}' and password= '${password}'`
    const [data] = await con.query(sql)
    // console.log(data[0].id);
    con.end(function (err) {}) //连接结束
    if (data.length > 0) {
        ctx.body = {
            code: 200,
            tips: '登录成功',
            token: jwt.sign(userdata, secret),
            data: data[0].id
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '登录失败'
        }
    }
})
//用户注册
index.post('/userRegister', async ctx => {
    const username = ctx.request.body.username.trim()
    const password = ctx.request.body.password.trim()
    const con = await Mysql.createConnection(blog)
    const [data] = await con.query(`SELECT * FROM user`)
    con.end(function (err) {}) //连接结束
    var code, tips
    data.some(item => {
        if (item.username === username) {
            code = 201
            tips = '用户名已存在'
            return true
        }
    })

    if (code != 201) {
        const con = await Mysql.createConnection(blog)
        const sql = `INSERT INTO user (username,password)
                     VALUE('${username}', '${password}')`
        const [rs] = await con.query(sql)
        con.end(function (err) {}) //连接结束

        if (rs.affectedRows > 0) {
            code = 200
            tips = '注册成功'
        } else {
            code = 400
            tips = '注册失败'
        }
    }

    ctx.body = {
        code,
        tips
    }
})

//用户查询密码
index.post('/getPwd',async ctx =>{
    // const data1= ctx.request.body;
    // console.log(data1);
    const username = ctx.request.body.username;
    // console.log(username);
    const con = await Mysql.createConnection(blog)
    const sql = `SELECT password FROM user WHERE username ='${username}'`
    const [data] = await con.query(sql)
    // console.log(data[0].password);
    con.end(function(err){}) //连接结束
    if(data.length>= 0 ){
        ctx.body= {
            code:200,
            tips:'查询密码成功',
            data:data[0].password
        }
    }else{
        ctx.body = {
            code:400,
            tips:'查询密码失败'
        }
    }
})

//点赞数增加
index.put('/addcount', async ctx => {
    const id = ctx.request.body.id
    // console.log(id);
    const con = await Mysql.createConnection(blog)
    const countnumber = `SELECT count FROM article WHERE id = '${id}'`
    const [count] = await con.query(countnumber)
    let number = count[0].count + 1
    // console.log(count[0].count);
    const sql = `UPDATE article SET count = ${number}  WHERE id = '${id}'`
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '点赞成功',
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '点赞失败',
        }
    }
})
// 浏览量增加
index.put('/addRead', async ctx => {
    const id = ctx.request.body.id
    // console.log(id);
    const con = await Mysql.createConnection(blog)
    const readnumber = `SELECT readcount FROM article WHERE id = '${id}'`
    const [readcount] = await con.query(readnumber)

    let number = readcount[0].readcount + 1
    console.log(readcount[0].readcount);
    const sql = `UPDATE article SET readcount = ${number} WHERE id = '${id}'`
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '获取成功',
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取失败',
        }
    }
})

//发表评论
index.post('/postcomment', async ctx => {
    const titleid = ctx.request.body.tid
    const username = ctx.request.body.uname
    const content = ctx.request.body.content
    const date = ctx.request.body.date
    const con = await Mysql.createConnection(blog)
    const sql = `INSERT INTO comment (username,titleid,content,date) VALUE
    ('${username}', '${titleid}', '${content}','${date}')`
    const [rs] = await con.query(sql)
    con.end(function (err) {}) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code: 200,
            tips: '评论成功',
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '评论失败'
        }
    }
})
//获取评论
index.post('/getComments', async ctx => {
    const pagenum = ctx.request.body.pagenum - 1
    const pagesize = ctx.request.body.pagesize
    const query = ctx.request.body.query
    // console.log(pagenum,pagesize,query)
    const con = await Mysql.createConnection(blog)
    if (query == '' || query == null) {
        var sql = `SELECT a.id, a.username,a.titleid,a.content,a.date,b.title FROM comment a,article b
        WHERE  a.titleid = b.id LIMIT ${pagenum * pagesize},${pagesize}`
        var [data] = await con.query(sql)
    } else {
        var sql = `SELECT  a.id, a.username,a.titleid,a.content,a.date,b.title FROM comment a,article b
        WHERE  a.titleid = b.id and b.title like'%${query}%'
    LIMIT ${pagenum * pagesize},${pagesize}`
        var [data] = await con.query(sql)
    }
    const sql2 = `SELECT  a.id,a.username,a.titleid,a.content,a.date,b.title FROM comment a,article b
    WHERE  a.titleid = b.id`
    const [data2] = await con.query(sql2)
    con.end(function (err) {}) //连接结束
    if (data.length >= 0 && data2.length >= 0) {
        ctx.body = {
            code: 200,
            tips: '获取评论成功',
            data,
            total: data2.length
        }
    } else {
        ctx.body = {
            code: 400,
            tips: '获取失败'
        }
    }
})
module.exports = index