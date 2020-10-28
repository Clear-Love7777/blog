<template>
    <div id="header">
    <!-- 头部导航 -->
    <header>
      <section>
        <a href="javascript:void(0);">
          <img src="..\assets\logo.jpg" alt="" />
          <span>June</span>
        </a>
        <nav>
          <li>
            <router-link to="/articles"
              ><svg class="homeicon">
                  <use xlink:href="#icon-home"></use>
                </svg>主页</router-link
            >
          </li>
            <li>
            <router-link to="/messageBoard"
              ><i class="el-icon-edit"></i> 留言板</router-link
            >
          </li>
          <li>
            <router-link to="/other"
              ><i class="el-icon-more-outline"></i> 其他</router-link
            >
          </li>
         
          <div class="buttons">
            <el-button
              type="primary"
              plain
              size="mini"
              @click="toLogin"
              v-show="btnLogin"
              >登录</el-button
            >
            <el-button
              type="info"
              plain
              size="mini"
              @click="logout"
              v-show="btnLogout"
              >退出</el-button
            >
          </div>
        </nav>
      </section>
    </header>
    </div>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{

        }
    },
    created(){
    this.getStatus();  //调用控制登录登出状态函数
    },
    methods:{
         // 跳转到登录
    toLogin() {
      this.$router.push("/login");
    },
        //控制登录登出状态函数
    getStatus() {
      if (sessionStorage.getItem("token") == null) {
        this.btnLogin = true;
        this.btnLogout = false;
      } else {
        this.btnLogin = false;
        this.btnLogout = true;
      }
    },
    //登出
    logout() {
      //清空token
      window.sessionStorage.removeItem("token");
      location.reload();
      this.$message({ message: "登出成功", type: "success", duration: 1000 });
    },
    }
}
</script>

<style lang="less" scoped>
#header {
  width: 100vw;
  // background-color: #f5f8f9;
  position: relative;
  > header {
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
}
#header > header {
  section {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    a {
      display: flex;
      align-items: center;
      margin-right: 1vw;
      &:hover span {
        color: #1e90ff;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
      span {
        color: #000;
        font-size: 20px;
        transition: color 0.25s;
      }
    }
  }
  nav {
    display: flex;
    list-style: none;
    line-height: 60px;
    li {
      a {
        color: #000;
        transition: color 0.5s;
        &:hover {
          color: #1e90ff !important;
        }
        font-size: 15px;
        > i {
          margin-right: 2px;
        }
      }
    }
  }
   .buttons {
  position: absolute;
  right: 180px;
  }
}
</style>