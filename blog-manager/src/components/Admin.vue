<template>
  <el-container class="user-container">
    <!-- 头部 -->
    <el-header>
      <div class="touxiang">
        <img src="https://s1.ax1x.com/2020/10/13/0hgDkF.jpg" />
        <span>博客后台管理系统</span>
      </div>
      <el-button type="success" @click="tologin" v-show="btnLogin"
        >登录</el-button
      >
      <el-button type="info" @click="logout" v-show="btnLogout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="allarticles">
            <span slot="title">博客信息</span>
          </el-menu-item>
          <el-menu-item index="sortmessages">
            <span slot="title">分类信息</span>
          </el-menu-item>
          <el-menu-item index="labelmessages">
            <span slot="title">标签信息</span>
          </el-menu-item>
          <el-menu-item index="commentmessages">
            <span slot="title">评论信息</span>
          </el-menu-item>
          <el-menu-item index="publishblog">
            <span slot="title">发布博客</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //是否折叠
      isCollapse: false,
    };
  },
  created() {
    //调用控制登录登出状态函数
    this.getStatus();
    //禁止鼠标右键点击
    (document.oncontextmenu = () => {
      event.returnValue = false;
    }),
      // 禁用选择
      (document.onselectstart = () => {
        event.returnValue = false;
      });
  },
  methods: {
    tologin() {
      this.$router.push("/login");
    },
    //点击按钮 切换折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
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
      window.sessionStorage.removeItem("token");
      location.reload();
      this.$message({ message: "登出成功", type: "success", duration: 1000 });
    },
  },
};
</script>


<style lang="less" scoped>
.touxiang img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 15px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.user-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0px;
  }
}
.el-main {
  background-color: #eaedf1;
}
.el-submenu {
  font-size: 20px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>