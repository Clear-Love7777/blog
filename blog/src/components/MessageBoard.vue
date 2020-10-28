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
                <use xlink:href="#icon-jinggao" @click=""></use>
              </svg>
              留言说明:
            </p>
            <p>务必填写有效的邮箱地址，否则不会收到回复信息的~</p>
          </el-row>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row class="form-top">
              <el-form-item label="昵称" label-width="70px" prop="name">
                <el-input placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="70px" prop="email">
                <el-input placeholder="请输入有效邮箱地址"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                class="content"
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
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
          <el-row class="commnet-total">
            <span>共{{ count || 0 }}条评论</span>
          </el-row>

          
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
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
        name: "",
        email: "",
        content: "",
      },
    };
  },
  components: {
    Header,
    Editor,
  },
  created() {},
  methods: {},
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
    width:60%;
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
.content {
  margin-left: -30px;
}
</style>