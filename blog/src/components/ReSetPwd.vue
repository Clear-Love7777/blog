<template>
    <div class="resetpwd">
        <!-- 遮罩 -->
        <div class="mask"></div>
        <section>
            <h1>ReSet Password</h1>
            <div class="retrieve-pwd">
                <div class="step">
                    <el-steps :active="active" simple>
                        <el-step title="密码重置" icon="el-icon-unlock"></el-step>
                        <el-step title="重置完成" icon="el-icon-check"></el-step>
                    </el-steps>
                </div>
                <div class="validate-process">
                    <!-- <div class="step1" v-show="active == 1">
                        <el-form ref="validateFormOneRef" :model="validateFormOne" :rules="validateRulesOne">
                            <el-form-item prop="username">
                                <el-input v-model="validateFormOne.username" clearable prefix-icon="el-icon-user-solid"
                                    placeholder="请输入用户名" autofocus="true"></el-input>
                            </el-form-item>
                            <el-form-item prop="email">
                                <el-input v-model="validateFormOne.email" clearable prefix-icon="el-icon-message"
                                    placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                        </el-form>
                    </div> -->
                    <div class="step2" v-show="active == 1">
                        <el-form ref="validateFormTwoRef" :model="validateFormTwo" :rules="validateRulesTwo">
                            <el-form-item prop="password">
                                <el-input v-model="validateFormTwo.password" clearable prefix-icon="el-icon-lock"
                                    placeholder="请输入新密码" type="password" autofocus="true"></el-input>
                            </el-form-item>
                            <el-form-item prop="checkpwd">
                                <el-input v-model="validateFormTwo.checkpwd" clearable prefix-icon="el-icon-lock"
                                    placeholder="请确认新密码" type="password"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="step3" v-show="active == 2">
                        重置成功，请重新<router-link to="/login">登录</router-link>
                    </div>
                </div>
                <div class="button" v-show="active < 2"> 
                    <el-button @click="next" type="primary">下一步</el-button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱   
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        // 确认密码规则
        var checkpwd = (rule, value, cb) => {
            if (this.validateFormTwo.password === this.validateFormTwo.checkpwd) {   
                return cb()
            }
            cb(new Error('两次密码不一致'))
        }
        return {
            active: 1,
            validateFormTwo:{//验证表单(setp2)
                username:'',
                password:'',
                checkpwd:''
            },
            validateRulesTwo:{//重置密码规则
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                ],
                checkpwd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: checkpwd, trigger: 'blur' }
                ],
            },
        }
    },
    created(){
        this.getUsername()
    },
    
    methods:{
        getUsername(){
                   this.validateFormTwo.username = window.sessionStorage.getItem('username')
                   console.log(this.validateFormTwo.username);
        },
        //下一步
        next() {
             if(this.active === 1){
                this.$refs.validateFormTwoRef.validate( async valid => {
                    if(!valid) return this.$message({message: `请按照规定设置新密码`,type: 'error',duration:1000})
                    const {data:res} = await this.$http.put('resetpwd',this.validateFormTwo)
                    if(res.code != 200) return this.$message({message: `${res.tips}`,type: 'error',duration:1000})
                    this.$message({message: `${res.tips}`,type: 'success',duration:1000})
                    this.active++
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.resetpwd{
    height: 100vh;
    background: url(https://s1.ax1x.com/2020/11/04/BcunZ8.jpg) no-repeat center center;
    .mask{
        height: 100%;
        background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
    }
    section{
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
h1{
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin-bottom: 50px;
}
.retrieve-pwd{
    width: 700px;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(255,255,255);
    border-radius: 8px;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, .05);
    .validate-process{
        width: 500px;
        margin: 50px auto;
    }
    .button{
        width: 500px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.step3{
    text-align: center;
    font-size: 20px;
    a{
        color: #2468F2;
        cursor: pointer;
    }
}
</style>