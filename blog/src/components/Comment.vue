<template>
    <div class="comment">
        <div class="title-comment">
            <span>评论</span>
            <span>共{{commentList.length}}条评论</span>
            <div></div>
        </div>
        <div class="yours-comment">
            <div class="part-one">
                <img src="https://s1.ax1x.com/2020/11/04/BcKfBV.jpg" alt="">
                <div class="triangle"></div>
                <textarea placeholder="评论" maxlength=140 v-model="commentForm.content"></textarea>
            </div>
            <div class="part-two">
                <span>140</span>
                <button @click="submitComment">评论</button>
            </div>
        </div>
        <div class="others-comment">
            <div class="title">
                <span>所有评论</span>
                <div></div>
            </div>
            <div class="others-comment-item" v-for="(item,index) in commentList" :key="item.id">
                <img :src="item.avatar" alt="">
                <div class="right">
                    <div class="content">
                        <span>{{item.username}}：</span>
                        <span>{{item.content}}</span>
                    </div>
                    <div class="time">
                        <span>{{item.date | dateFormat}}</span>
                    </div>
                </div>
            </div>
            <div class="empty" v-if="commentList.length == 0">
                暂无评论
            </div>
        </div>
    </div>
</template>

<script>
export default {
    inject:['reload'],//注入重载方法
    props:{
        'commentList':Array,
        'id':Number,
        'getBlogComment':Function
    },
    data(){
        return {
            commentForm:{//评论表单
                blog_id:'',
                user_id:'',
                content:'',
                date:new Date(),
                agree_count:0
            },
        } 
    },
    created(){
        let userForm = JSON.parse(window.sessionStorage.getItem('userForm'))
        if(userForm !== null) {
            this.commentForm.user_id = userForm.id
            this.user_avatar = userForm.avatar
        }else{
            this.user_avatar = 'https://s3.ax1x.com/2020/12/09/r9jlDg.png'
        }
    },
    methods:{
        //处理时间格式
        dealDate(time){
            const t = new Date(time)
            const y = t.getFullYear()
            const m = (t.getMonth() + 1 + '').padStart(2, '0')
            const d = (t.getDate() + '').padStart(2, '0')
            const hh = (t.getHours() + '').padStart(2, '0')
            const mm = (t.getMinutes() + '').padStart(2, '0')
            const ss = (t.getSeconds() + '').padStart(2, '0')
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        },
        //提交评论
        async submitComment(){
            if(!window.sessionStorage.token)  
            return this.$message({message:'您还没有登录，请点击右上角的登录链接',type:'error',duration:1000,offset:5})
            if(this.commentForm.content.length === 0) 
            return this.$message({message:'您还没有评论',type:'error',duration:1000,offset:5})
            this.commentForm.blog_id = this.id
            this.commentForm.date = this.dealDate(this.commentForm.date)
            const {data:res} = await this.$http.post('addComment',this.commentForm)
            if(res.code != 200) {
                this.commentForm.content = ''
                return this.$message({message:`${res.tips}`,type:'error',duration:1000,offset:5})
            }
            this.$message({message:`${res.tips}`,type:'success',duration:1000,offset:5})
            this.reload()
        },
    }
}
</script>

<style lang="less" scoped>
.comment{
    box-sizing: border-box;
    padding: 0 20px;
}
.title-comment{
    span:first-child{font-size: 18px;}
    span:nth-child(2){
        font-size: 12px;
        margin-left: 20px;
        color: #666;
    }
    div{
        border: 1px solid #2468F2;
        margin: 10px 0 20px 0;
    }
}
.yours-comment{
    .part-one{
        display: flex;
        box-sizing: border-box;
        position: relative;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 15px;
        }
        .triangle{
            position: absolute;
            top: 12px;
            left:65px;
            width: 0;
            height: 0;
            border-width:6px 10px 6px 0;
            border-style: solid;
            border-color: transparent #CDCDCD transparent transparent;
            &::after{
                content: "";
                position: absolute;
                top: -5px;
                left:3px;
                width: 0;
                height: 0;
                border-width:5px 8px 5px 0;
                border-style: solid;
                border-color: transparent #fff transparent transparent;
            }
        } 
        textarea{
            resize: none;
            width: 100%;
            border-color: #CDCDCD;
            border-radius: 2px;
            outline: #CDCDCD;
            padding: 3px 0 0 5px;
        }
    }
    .part-two{
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        span{color: #666;font-size: 14px;}
        button{
            margin-left: 10px;
            height: 20px;
            width: 44px;
            color: #fff;
            background-color: #2468F2;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 2px;
            font-size: 12px;
            &:hover{opacity: 0.8;}
        }
    }
}
.others-comment{
    .title{
        span{font-size: 14px;}
        div{border: 1px solid #CFCFCF;margin-top: 5px;}
    }
    .others-comment-item{
        padding: 15px 0;
        display: flex;
        border-bottom: 1px dotted #ccc;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 15px;
        }
        .right{
            flex: 1;
            display: flex;
            flex-direction: column;
            .content{
                font-size: 14px;
                span:first-child{color: #2468F2;}
            }
            .reply-comment{
                min-height: 40px;
                box-sizing: border-box;
                background-color: #F8F8F8;
                border: 1px solid #D9D9D9;
                margin-top: 10px;
                display: flex;
                align-items: center;
                padding-left:20px;
                span{font-size: 12px;}
                span:first-child{color: #2468F2;}
            }
            .time{
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                >span{color: #999;}
                .operate{
                    span:first-child{
                        cursor: pointer;
                        &:hover{color: #2468F2;}
                        i{margin-right: 2px;}
                    }
                    span:nth-child(2){
                        margin: 0 10px;
                        color: #CFDBED;
                    }
                    span:last-child{
                        cursor: pointer;
                        &:hover{color: #2468F2;text-decoration: underline;}
                    }
                }
            }
            .replyBox{
                position: relative;
                box-sizing: border-box;
                padding: 20px;
                height: 100px;
                background-color: #F8F8F8;
                border: 1px solid #D9D9D9;
                margin-top: 20px;
                .triangle{
                    position: absolute;
                    top: -10px;
                    right:5px;
                    width: 0;
                    height: 0;
                    border-width:0 10px 10px 10px;
                    border-style: solid;
                    border-color: transparent transparent #CDCDCD transparent;
                    &::after{
                        content: "";
                        position: absolute;
                        top: 1px;
                        right: -9px;
                        width: 0;
                        height: 0;
                        border-width: 0 9px 9px 9px;
                        border-style: solid;
                        border-color: transparent transparent #F8F8F8 transparent;
                    }
                }
                textarea{
                    width: 100%;
                    resize: none;
                    border-radius: 2px;
                    border: 1px solid #CDCDCD;
                    outline: #CDCDCD;
                    padding: 3px 0 0 5px;
                }
                div:last-child{
                    margin-top: 10px;
                    display: flex;
                    justify-content: flex-end;
                    span{color: #666;font-size: 14px;}
                    button{
                        margin-left: 10px;
                        height: 20px;
                        width: 44px;
                        color: #fff;
                        background-color: #2468F2;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        border-radius: 2px;
                        font-size: 12px;
                        &:hover{opacity: 0.8;}
                    }
                }
            }
        }
    }
}
.empty{
    text-align: center;
    margin: 50px 0;
    color: red;
}
.changeColor{
    color: #2468F2!important;
}
</style>