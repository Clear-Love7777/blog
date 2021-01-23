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
    // console.log(userdata);
    const secret = "jun"
    const con = await Mysql.createConnection(blog)
    var sql = `SELECT * FROM user where username = '${username}' and password= '${password}'`
    const [res] = await con.query(sql)
    // console.log(data[0].id);
    con.end(function (err) {}) //连接结束
    if (res.length > 0) {
        ctx.body = {
            code: 200,
            tips: '登录成功',
            username:res[0].username,
            email:res[0].email,
            id:res[0].id,
            avatar:res[0].avatar,
            token: jwt.sign(userdata, secret),
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
    const email = ctx.request.body.email.trim()
    const avatar = ctx.request.body.avatar.trim()
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
        const sql = `INSERT INTO user (username,password,email,avatar)
                    VALUE('${username}', '${password}', '${email}', '${avatar}')`
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

    const username = ctx.request.body.username;
    const email = ctx.request.body.email;
    const con = await Mysql.createConnection(blog)
    const sql = `SELECT password FROM user WHERE username ='${username}' and email = '${email}'`
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
    const con = await Mysql.createConnection(blog)
    const readnumber = `SELECT readcount FROM article WHERE id = '${id}'`
    const [readcount] = await con.query(readnumber)

    let number = readcount[0].readcount + 1
    // console.log(readcount[0].readcount);
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
//根据博客id获取该博客的所有评论
index.get('/getAllComment/:id',async ctx => {
    const blog_id = ctx.params.id 
    // console.log(blog_id);
    const connection = await Mysql.createConnection(blog)
    const sql = `SELECT a.id,a.content,a.date,a.agree_count,a.user_id,a.agree_user_id,b.username,b.avatar
                 FROM blog_comment a,user b WHERE a.blog_id = ${blog_id} and a.user_id = b.id`
    const [data] = await connection.query(sql)
    const sql2 = `SELECT a.respondent_id,a.reply_content,b.username 
                  FROM reply_comment a,user b WHERE a.blog_id = ${blog_id} and a.commentator_id = b.id`
    const [data2] = await connection.query(sql2)
    connection.end(function (err) { }) //连接结束

    if (data.length >= 0) {
        ctx.body = {
            data,
            data2,
            code:200,
            tips:'获取评论数据成功'
        }
    } else {
        ctx.body = {
            code:400,
            tips:'获取评论数据失败'
        }
    }
})

//添加用户的评论
index.post('/addComment',async ctx => {
    const commentForm = ctx.request.body
    const con = await Mysql.createConnection(blog)
    // console.log(commentForm);
    const sql = `INSERT INTO blog_comment (blog_id,user_id,content,date,agree_count,agree_user_id) VALUE
    (${commentForm.blog_id}, ${commentForm.user_id},'${commentForm.content.trim()}', 
    '${commentForm.date.trim()}', ${commentForm.agree_count}, '[]')`
    const [rs] = await con.query(sql)
    con.end(function (err) { }) //连接结束
    if (rs.affectedRows > 0) {
        ctx.body = {
            code:200,
            tips:'发表评论成功'
        }
    } else {
        ctx.body = {
            code:400,
            tips:'发表评论失败'
        }
    }
})

module.exports = index