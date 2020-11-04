<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form
        ref="RegisterFormRef"
        :model="RegisterForm"
        :rules="RegisterFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            v-model="RegisterForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="RegisterForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input
            placeholder="请再次输入密码"
            v-model="RegisterForm.password2"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="success" @click="userRegister">注册</el-button>
          <el-button type="primary" @click="toUserLogin">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
                callback(new Error('请输入密码'));
        } else {
          if (this.RegisterForm.password2 !== '') {
              this.$refs.RegisterFormRef.validateField('password2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
          if (value === '') {
              callback(new Error('请再次输入密码'));
          } else if (value !== this.RegisterForm.password) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
    return {
      //这是登录表单的数据绑定对象
      RegisterForm: {
        username: "",
        password: "",
         password2: "",
      },
      //这是表单的验证规则对象
      RegisterFormRules: {
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
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          password2:[
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur', required: true }
        ],
      },
    };
  },
  methods: {
    //跳转到登录
    toUserLogin() {
      this.$router.push("/login");
    },
    userRegister() {
      this.$refs.RegisterFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("userRegister", this.RegisterForm);
        if (res.code !== 200)return this.$message.error({message: `${res.tips}`,type: 'error',duration:1000})
          this.$message({message: `${res.tips}`,type: 'success',duration:1000});
        this.$refs.RegisterFormRef.resetFields()
      });
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
