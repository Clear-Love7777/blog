<template>
  <div id="blog">
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
              ><i class="el-icon-s-home"></i>主页</router-link
            >
          </li>
          <li>
            <router-link to="/share"
              ><i class="el-icon-s-order"></i> 其他</router-link
            >
          </li>
          </li>
        </nav>
      </section>
    </header>
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
      active-text-color="#ffd04b"
      :router="true"
      >
       <el-menu-item index="introduction">
        <span slot="title">自我介绍</span>
      </el-menu-item>

         <el-menu-item index="">
        <span slot="title">百度翻译</span>
      </el-menu-item>
      
         <el-menu-item index="">
        <span slot="title">图片识别文字</span>
      </el-menu-item>
      
         <el-menu-item index="">
        <span slot="title"></span>
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
export default {
  data() {
    return {
       //是否折叠
      isCollapse:false,
      daily: [],
    };
  },
  created() {
    this.getDailyMessage();
  },
  methods: {
    async getDailyMessage() {
      const { data: res } = await this.$http.get("getDailyMessage");
      if (res.code != 200) return this.$message.error("获取日志失败");
      this.daily = res.data;
      console.log(res.data);
    },
      //点击按钮 切换折叠和展开
     toggleCollapse(){
      this.isCollapse = ! this.isCollapse 
  },
  },
};
</script>

<style lang="less" scoped>
#blog {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  > header {
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
}
#blog > header {
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
}
.user-container{
    height: 100%;
}
.el-aside {
  .el-menu{
    border-right: 0px;
  }
}

.el-submenu{
    font-size: 20px;
}
.toggle-button{

  font-size: 10px;
  line-height: 24px;
  color: black;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}


</style>