<template>
  <div id="content">
    <article v-html="html" v-highlight class="markdown-body md"></article>
    <div class="dianzan">
      <a style="cursor: pointer; text-decoration: none">
        <svg class="icon icon-edit" aria-hidden="true" @click="addcount">
          <use xlink:href="#icon-dianzan"></use>
        </svg>
      </a>
    </div>
    <div class="span1">
      <span>喜欢就点个赞吧</span>
    </div>
  </div>
</template>

<script>
import showdown from "showdown";
export default {
  data() {
    return {
      html: "",
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
    async getmd() {
      var converter = new showdown.Converter();
      var url = window.location.href;
      var mdname = url.split("?")[1];
      const { data: res } = await this.$http.get(`readmd/${mdname}`);
      if (res.code != 200) return this.$message.error(`${res.tips}`);
      this.html = converter.makeHtml(res.data[0].content);
    },
    async addcount() {
      var id = window.sessionStorage.getItem("id");
    //   console.log(id);
      const { data: res } = await this.$http.put("/addcount", {id});
      if (res.code !== 200)
        return this.$message.error({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      this.$message({
        message: `${res.tips}`,
        type: "success",
        duration: 1000,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/css/md.css";
#content {
  max-width: 95%;
  min-width: 95%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 30px;
  padding: 20px 20px;
  margin-top: 25px;
  box-sizing: border-box;
  color: #565a5f;
  .dianzan {
    width: 2.5em;
    margin: auto;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  .span1 {
    text-align: center;
  }
  .icon {
    width: 2.5em;
    height: 2.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .md {
    box-sizing: border-box;
  }
}
</style>