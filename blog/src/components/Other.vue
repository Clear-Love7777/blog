<template>
  <div id="blog">
    <Header></Header>
        <el-container> 
       <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
         <el-menu
         unique-opened 
      :collapse="isCollapse"
       :collapse-transition="false"
      class="el-menu-vertical-demo"
      text-color="#black"
      :router="true"
      >
       <el-menu-item index="introduction">
        <span slot="title">自我介绍</span>
      </el-menu-item>
       
         <el-menu-item index="cheat">
        <span slot="title">备忘录</span>
      </el-menu-item>

    <el-menu-item index="hotTop">
        <span slot="title">排行榜</span>
      </el-menu-item>

    </el-menu>
     </el-aside>
 
     <!-- 右侧主体 -->
     <el-main>
        <router-view></router-view> 
     </el-main>
     </el-container>
  </div>
</template>
<script>
import Header from '../publicvue/Header'
export default {
  data() {
    return {
      //是否折叠
      isCollapse: false,
    };
  },
   components:{
     Header
  },
  created() {},
  methods: {
    //点击按钮 切换折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>

.el-container {
  height: 100vh;
}
.el-aside {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  .el-menu {
    border-right: 0px;
  }
}
.el-menu-item span {
  margin-left: 20px;
}
.el-submenu {
  font-size: 20px;
}
.toggle-button {
  font-size: 10px;
  line-height: 24px;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>