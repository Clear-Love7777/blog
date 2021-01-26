<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 表单区域 -->
      <el-form :model="queryForm" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="queryForm.username"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-message"
            placeholder="请输入邮箱"
            v-model="queryForm.email"
          ></el-input>
        </el-form-item>
        <!-- 您的密码是 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="您的密码是"
            v-model="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="success" @click="getPwd">查询密码</el-button>
          <el-button type="primary" @click="toUserLogin">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        username: "",
        email: "",
      },
      password: "",
    };
  },
  methods: {
    //跳转到登录
    toUserLogin() {
      this.$router.push("/login");
    },
    async getPwd() {
      // console.log(this.queryForm);
      const { data: res } = await this.$http.post("getPwd", this.queryForm);
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
      this.password = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  width: 100%;
  background: url("https://s1.ax1x.com/2020/11/04/BcunZ8.jpg");
  background-size: 100% 100%;
  position: fixed;
}
.login_box {
  width: 450px;
  height: 300px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.forget {
  margin-left: 5px;
  font-size: 14px;
}
.login_form {
  position: absolute;
  bottom: 35px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
