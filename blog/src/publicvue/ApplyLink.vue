<template>
  <div class="apply-link">
    <h4>友链申请</h4>
    <el-row>
      <div class="tips">
        <p> <svg class="jingaoicon" aria-hidden="true">
                <use xlink:href="#icon-jinggao"></use>
              </svg>  温馨提示:</p>
        <p>在申请本站友链之前请确保已将本站加入友链。</p>
        <p>
          本站优先录入同类原创、技术生活类博客。任何包含违法国家法律或不健康内容站点均不录入。
        </p>
        <p>百度、搜狗等搜索引擎权重无要求，但是要求时常更新网站内容。</p>
        <p>本站会不定期互相走访友链，发现单方取消友链便拉入黑名单。</p>
        <!-- <p>
          特别提醒:
          若无意外，在申请友链后24小时内完成审核并录入站点，如超时还未审核完成，请留言或者私信给我。审核结果均以邮件形式通知，请输入常用有效邮箱。
        </p> -->
      </div>
    </el-row>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="站点名称" prop="linkname">
        <el-input
          v-model="ruleForm.linkname"
          placeholder="请输入站点名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="请输入有效的邮箱地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="站点地址" prop="href">
        <el-input
          v-model="ruleForm.href"
          placeholder="https://或者http://"
        ></el-input>
      </el-form-item>
      <el-form-item label="站点描述" prop="introduction">
        <el-input
          type="textarea"
          v-model="ruleForm.introduction"
          placeholder="请一句话描述一下您的站点"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即申请</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ApplyLink",
  data() {
    return {
      ruleForm: {
        linkname: "",
        email: "",
        href: "",
        introduction: "",
      },
      rules: {
        linkname: [
          { required: true, message: "请输入站点名称", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change",
          },
        ],
        url: [
          { required: true, message: "请输入站点地址", trigger: "blur" },
          {
            type: "url",
            message: "请输入正确的站点地址",
            trigger: "blur,change",
          },
        ],
        introduction: [
          { required: true, message: "请输入站点描述", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "blur,change",
          },
        ],
      },
    };
  },
  methods: {
      async submitForm(){
         this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return;
         const {data:res} = await this.$http.post("submitLinks",this.ruleForm);
         if(res.code!=200) return this.$message({message:`${res.tips}`,type:"error",duration:1000});
         this.$message({message:`${res.tips}`,type:"success",duration:1000})
         location.reload();
      })
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.apply-link {
  width: 100%;
  text-align: left;
  color: #96969c;
  padding: 10px;
  box-shadow: 0 0 5px rgba(202, 203, 203, 0.5);
  margin-top: 50px;
  box-sizing: border-box;
  .tips {
    line-height: 2;
    padding: 10px 0 20px 0;
    border-bottom: 1px solid #ccc;
    margin: 0 0 20px 0;
    .icon-tips {
      font-size: 18px;
      color: #f00;
      font-weight: bold;
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
  h4 {
    width: 100%;
    color: #409eff;
    padding: 20px 0 10px 0;
  }
  .el-form {
    width: 50%;
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
