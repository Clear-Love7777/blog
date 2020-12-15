<template>
  <div class="login_container">
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
            prefix-icon="el-icon-user-solid"
            placeholder="请输入账号"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
          prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="loginForm.password"
            type="password"
          ></el-input>
           </el-form-item>
          <div class="account-end">
            <router-link to="/register" class="back">注册</router-link>
            <span>|</span>
            <router-link to="/editpassword" class="forget"
              >忘记密码？</router-link
            >
            <span>|</span>
            <router-link to="/articles" class="back">游客浏览</router-link>
          </div>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button @click="userLogin">登录</el-button>
          </el-form-item>
          <p class="account-tips">
            温馨提示：只有登录才能使用一些有权限的功能哦!
          </p>
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
        username: "user",
        password: "123456",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
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
    userLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post("userLogin",this.loginForm);
        // console.log(res);
        if (res.code !== 200) return this.$message.error("登录失败！");
        window.sessionStorage.setItem("username", this.loginForm.username);
        window.sessionStorage.setItem("token", res.token);
           let userFrom = {
                    id:res.id,
                    username:res.username,
                    email:res.email,
                    avatar:res.avatar,
                    logintime:new Date()
                }

        window.sessionStorage.setItem('userForm',JSON.stringify(userFrom));
        this.$message.success("登录成功");
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
@no: 15;
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
button {
    margin-top:10px ;
  margin-left: 50px;
  width: 320px;
  padding: 12px 0;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: #2468f2;
  color: #fff;
  cursor: pointer;
}
.login_form {
  position: absolute;
  width: 450px;
  bottom: 35px;
  padding: 0 20rem / @no;
  box-sizing: border-box;
}
.back,
.forget {
  font-size: 16px;
  margin: 25px;
  color: #aaaaaa;
}
.account-end {
    margin-left: 40px;
  span {
    color: #aaaaaa;
  }
}
.account-tips {
  margin-top: -10px;
  font-size: 12px;
  line-height: 2;
  color: #aaaaaa;
}
</style>
