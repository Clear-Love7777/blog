<template>
  <div>
    <Header></Header>
    <div class="mid">
      <h2>留言互动</h2>
      <div>
        <el-card>
          <el-row class="tips">
            <p>
              <svg class="jingaoicon" aria-hidden="true">
                <use xlink:href="#icon-jinggao"></use>
              </svg>
              留言说明:
            </p>
            <div class="pspan">
              <p>务必填写有效的邮箱地址，否则不会收到回复信息的~</p>
              <span class="writeTime">{{ writeMessageTime }}</span>
            </div>
          </el-row>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row class="form-top">
              <el-form-item label="昵称" label-width="70px" prop="nickname">
                <el-input
                  placeholder="请输入昵称"
                  v-model="ruleForm.nickname"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="70px" prop="email">
                <el-input
                  placeholder="请输入有效邮箱地址"
                  v-model="ruleForm.email"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                class="contenttable"
                style="height: 400px; border: none"
                label="内容"
                prop="content"
              >
                <Editor
                  :value="ruleForm.content"
                  @listenToChildEvent="showMsgFromChild"
                ></Editor>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label-width="70px">
                <el-button type="primary" @click="submitAllMessage('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="cleanAll('ruleForm')">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
          <el-row class="commnet-total">
            <span>共{{ total || 0 }}条评论</span>
          </el-row>
          <scroll-page :loading="loading" :offset="offset" v-on:load="load">
            <el-row class="messages">
              <div class="item" v-for="(item, index) in message" :key="index">
                <div class="left">
                  <avatar
                    class="header-img"
                    :size="40"
                    :username="item.nickname"
                  ></avatar>
                </div>
                <div class="right">
                  <div class="right-top">
                    <span class="user">{{ item.nickname }}</span>
                    <span class="time">{{
                      item.create_time | dateFormat
                    }}</span>
                  </div>
                  <div class="right-bottom">
                    <div class="content" v-html="item.content"></div>
                    <div class="reply" v-if="item.reply != null">
                      <div class="content">
                        <i>站长回复：</i> <span v-html="item.reply"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-row>
            <el-row :class="isShow">没有更多了~</el-row>
          </scroll-page>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import Editor from "./Editor";
import Header from "../public/Header";
export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            required: true,
            message: "请输入有效邮箱地址",
            trigger: "blur",
          },
        ],
        content: [
          { required: true, message: "随便吐槽两句吧~", trigger: "blur" },
        ],
      },
      ruleForm: {
        nickname: "",
        email: "",
        content: "",
        date: "",
      },
      writeMessageTime: "", //留言的时间
      message: [],
      total: "",
      loading: false,
      noData: false,
      isShow: "hide",
    };
  },
  components: {
    Header,
    Editor,
    Avatar,
  },
  created() {
    this.getMessages();
  },
  mounted() {
    //初始化 使得页面渲染完成之前页面中有时间数据展示
    this.nowTime();
    setInterval(this.nowTime, 1000);
  },
  methods: {
    //当前时间
    nowTime() {
      const t = new Date();
      const y = t.getFullYear();
      const m = (t.getMonth() + 1 + "").padStart(2, "0");
      const d = (t.getDate() + "").padStart(2, "0");
      const hh = (t.getHours() + "").padStart(2, "0");
      const mm = (t.getMinutes() + "").padStart(2, "0");
      const ss = (t.getSeconds() + "").padStart(2, "0");
      this.currentTime = `${hh}:${mm}`;
      this.writeMessageTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    },
    load() {
      this.getMessage();
    },
    showMsgFromChild(data) {
      this.ruleForm.content = data;
    },
    async getMessages() {
      const { data: res } = await this.$http.get("getMessages");
      if (res.code != 200) return this.$message.error("获取留言失败");
      this.message = res.data;
      res.data.reverse();
      // console.log(res.data);
      this.total = res.total;
    },
    cleanAll(formName) {
      this.$refs[formName].resetFields();
    },
    submitAllMessage() {
      this.ruleForm.date = this.writeMessageTime;
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
        // console.log(this.ruleForm);
        const { data: res } = await this.$http.post(
          "submitAllMessage",
          this.ruleForm
        );
        if (res.code != 200)
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
        location.reload();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mid {
  width: 100%;
  h2 {
    text-align: center;
    color: gray;
    margin: 30px;
  }
  .el-card {
    width: 60%;
    margin: 0 auto;
  }
  .jingaoicon {
    width: 1.1em;
    height: 1.1em;
    position: relative;
    top: 3px;
    fill: currentColor;
    overflow: hidden;
  }
}
.el-form {
  width: 100%;
  .form-top {
    width: 100%;
    display: flex;
  }
  .el-form-item {
    flex: 1;
  }
}
.tips {
  line-height: 2;
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #ccc;
  margin: 0 0 20px 0;
}
.contenttable {
  margin-left: -30px;
}

.messages {
  width: 100%;
  .item {
    width: 100%;
    display: flex;
    padding: 20px 10px;
    box-sizing: border-box;
    border-bottom: #ececec 1px solid;
    .left {
      width: 6%;
    }
    .right {
      width: 94%;
      .right-top {
        width: 100%;
        display: flex;
        span {
          line-height: 30px;
        }
        .user {
          color: #1abc9c;
          margin-right: 10px;
        }
        .sys,
        .exe {
          text-align: center;
          font-size: 12px;
          background-color: #ededed;
          padding: 0 10px;
          margin-right: 10px;
        }
        .time {
          flex: 1;
          text-align: right;
          color: #999;
          font-size: 12px;
        }
      }
      .right-bottom {
        padding: 10px 0;
        line-height: 2;
        .content {
          padding-bottom: 10px;
          width: 100%;
          img {
            width: 10%;
          }
        }
        .reply {
          display: flex;
          padding-top: 10px;
          border-top: #ececec 1px solid;
          .content {
            border-bottom: none;
            i {
              color: rgb(255, 0, 0);
            }
          }
        }
      }
    }
  }
}

.pspan {
  display: flex;
  .writeTime {
    margin-left: auto;
  }
}
</style>