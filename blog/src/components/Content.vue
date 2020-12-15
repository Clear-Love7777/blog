<template>
  <div id="content">
    <!-- 博客 -->
    <article v-html="html" v-highlight class="markdown-body md"></article>
    <!-- 评论 -->
     <Comment :commentList="commentList" :id="blog_id" :getBlogComment="getBlogComment"></Comment>
  </div>
</template>

<script>
import showdown from "showdown";
import Comment from './Comment'
export default {
  components:{
        Comment,//评论组件
    },
  data() {
    return {
      html: "",
          commentList:[],//所有与当前博客相关的评论
           blog_id:Number,//当前博客id
      form: {
        tid: "",
        uname: "",
        content: "",
        date: "",
      },
    };
  },
  watch: {
    $route(to, from) {
      //路由变化再次调用方法
      this.getmd();
    },
  },
  created() {
    this.getmd(); //获取md文档博客数据
  },
  methods: {
    date(time) {
      const t = new Date(time);
      const y = t.getFullYear();
      const m = (t.getMonth() + 1 + "").padStart(2, "0");
      const d = (t.getDate() + "").padStart(2, "0");
      const hh = (t.getHours() + "").padStart(2, "0");
      const mm = (t.getMinutes() + "").padStart(2, "0");
      const ss = (t.getSeconds() + "").padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    },
    async getmd() {
      var converter = new showdown.Converter();
      var url = window.location.href;
      var mdname = url.split("?")[1];
      const { data: res } = await this.$http.get(`readmd/${mdname}`);
      if (res.code != 200) return this.$message.error(`${res.tips}`);
      this.html = converter.makeHtml(res.data[0].content);
      var titleid = window.sessionStorage.getItem('titleid')
      this.blog_id = titleid
      // console.log(this.blog_id);
       this.getBlogComment(this.blog_id)
    },
    //根据当前博客id获取所有与当前博客相关的评论
        async getBlogComment(id){
            const {data:res} = await this.$http.get(`getAllComment/${id}`)
            if(res.code != 200) return this.$message.error(`${res.tips}`)
             this.commentList = res.data
            // console.log(res.data);
        }
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/md.css";
@no:15;
#content {
  max-width: 94%;
  min-width: 94%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 30px;
  padding: 20px 20px;
  margin-top: 25px;
  box-sizing: border-box;
  color: #565a5f;
  .md {
    box-sizing: border-box;
  }
  .comment{
    margin-top: 15px;
  }
}
</style>