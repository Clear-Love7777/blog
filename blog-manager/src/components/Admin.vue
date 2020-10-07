<template>
 <el-container class="user-container">
      <!-- 头部 -->
      <el-header>
      <div>
        <span>博客后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
     <!-- 主体 -->
      <el-container> 
       <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
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
        <i class="el-icon-menu"></i>
        <span slot="title">导航1</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">导航2</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航3</span>
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
    data(){
      return{
      //是否折叠
      isCollapse:false,
      }
    },
    created(){

    },
    methods:{
        logout() {
      //清空token
      window.sessionStorage.clear()
      //转到登录页面
      this.$router.push('/login')
    },
     //点击按钮 切换折叠和展开
     toggleCollapse(){
      this.isCollapse = ! this.isCollapse 
  },
    }
}
</script>


<style lang="less" scoped>
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
.user-container{
    height: 100%;
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: 0px;
  }
}
.el-main {
  background-color: #eaedf1;
}
.el-submenu{
    font-size: 20px;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>