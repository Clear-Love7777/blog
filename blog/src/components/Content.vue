<template>
  <div id="content">
    <article v-html="html" v-highlight class="markdown-body md"></article>
    <div class="allicon">
      <div class="dianzan">
        <a style="cursor: pointer; text-decoration: none">
          <svg class="icon icon-edit" aria-hidden="true" @click="addcount">
            <use xlink:href="#icon-dianzan"></use>
          </svg>
        </a>
      </div>
      <div class="comment" @click="dialogFormVisible = true">
        <a style="cursor: pointer; text-decoration: none">
          <svg class="icon icon-edit" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
        </a>
      </div>
    </div>
    <div class="allspan">
      <div class="span1">
        <span>喜欢就点个赞吧</span>
      </div>
      <div class="span2">
        <span>我要评论</span>
      </div>
    </div>
   
    <!-- 评论对话框 -->
    <el-dialog title="评论" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth">
          <el-input
            v-model="form.content"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="选择日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postcomment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import showdown from "showdown";
export default {
  data() {
    return {
      html: "",
      dialogFormVisible: false,
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
    },
    async addcount() {
      var id = window.sessionStorage.getItem("titleid");
      // console.log(id);
      const { data: res } = await this.$http.put("/addcount", { id });
      if (res.code !== 200)
        return this.$message({
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
    async postcomment() {
      var tid = window.sessionStorage.getItem("titleid");
      this.form.tid = tid;
      var uname = window.sessionStorage.getItem("username");
      this.form.uname = uname;
          this.form.date = this.date(this.form.date);
      const { data: res } = await this.$http.post("/postcomment", this.form);
      if (res.code !== 200)
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
          this.$message({
          message: `${res.tips}`,
          type: "success",
          duration: 1000,
        });
      this.form = {
        tid: "",
        uid: "",
        content: "",
        date: "",
      };
      this.dialogFormVisible = false;
       location.reload()
    },
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
  .allicon {
    display: flex;
  }
  .allspan {
    display: flex;
  }
  .dianzan {
    width: 2.5em;
    position: relative;
    left: 30%;
    margin-top: 15rem/@no;
    margin-bottom: 5rem/@no;
  }
  .span1 {
    position: relative;
    left: 26%;
  }
  .span2 {
    position: relative;
    left: 52%;
  }
  .comment {
    width: 2.5em;
    position: relative;
    left: 60%;
    margin-top: 15rem/@no;
    margin-bottom: 5rem/@no;
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
.dialog-footer {
  margin-top: -20rem/@no;
}
.el-icon-pie-chart {
  margin-right: 3rem/@no;
}
.commentdate {
  float: right;
  margin-top: -5rem/@no;
}
</style>