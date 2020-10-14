<template>
    <div id="content">
        <article v-html="html" v-highlight class="markdown-body md"></article>
    </div>
</template>

<script>
import showdown from 'showdown'
export default {
    data(){
        return {
           html:''
        }
    },
    watch: {
        $route(to,from){//路由变化再次调用方法
            this.getmd()
        }
    },
    created() {
        this.getmd()//获取md文档博客数据
    },
    methods: {
        async getmd(){
            var converter = new showdown.Converter()
            var url = window.location.href;
            var mdname = url.split("?")[1];
            const {data:res} = await this.$http.get(`readmd/${mdname}`)
            if(res.code != 200) return this.$message.error(`${res.tips}`)
            this.html = converter.makeHtml(res.data[0].content)
        }
    }
}
</script>

<style lang="less" scoped>
@import "../assets/css/md.css";
#content{
    max-width: 95%;
    min-width: 95%;
    margin: 0 auto;
    article{
        width: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.12);
        margin-bottom: 10px;
        padding: 20px 20px;
        margin-top: 25px;
        box-sizing: border-box;
        color: #565A5F;
    }
    .md{
        box-sizing: border-box;
    }
}
</style>