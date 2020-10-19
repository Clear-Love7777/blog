<template>
  <div class="login_container">
    <img src="..\assets\背景.jpg" width="100%" height="100%" alt="" />
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
           placeholder="请输入账号"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
           placeholder="请输入密码"
            v-model="loginForm.password"
            type="password"
          ></el-input>
       <router-link to="/editpassword" class="forget"> 忘记密码？</router-link>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="userLogin">登录</el-button>
          <el-button type="success" @click="toUserRegister">去注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
      //跳转到注册
      toUserRegister(){
      this.$router.push('/register')
    },
    userLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("userLogin", this.loginForm);
        if (res.code !== 200)return this.$message.error("登录失败！");
          this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
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
  margin-top: -40px;
}
.forget{
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
