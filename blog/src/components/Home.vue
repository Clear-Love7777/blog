<template>
  <div class="main">
    <!-- 左侧区域 -->
    <div class="leftindex">
      <div class="leftindex-header">
        <img src="..\assets\logo.jpg" alt="" class="touxiang" />
        <span class="name">Jun Xiao</span><br />
        <span>Personal blog</span><br />
        <div class="searchlabel">
          <input
            type="text"
            value=" 搜索"
            onfocus="if(value == defaultValue){value=''}"
            onblur="if(!value){value = defaultValue}"
          />
        </div>
      <div class="icon">
        <img src="../assets/wechat.png" alt="" class="wechat" />
        <img src="../assets/QQ.png" alt="" class="QQ" />
        <img src="../assets/email.png" alt="" class="email" /> <br />
        <span>Contact me through these channels</span>
      </div>
      </div>
    </div>

    <!-- 中间区域 -->
    <div class="mainindex">
        <!-- 路由占位符 -->
      <router-view></router-view> 
    </div>

    <!-- 右边区域 -->
    <div class="rightindex">
      <ul>
        <li class="rightindex-title">公告</li>
        <li>欢迎交流和分享经验！</li>
      </ul>
      <ul>
        <li class="rightindex-title">分类</li>
        <li  v-for="item in blogList" class="sort" :style="{'backgroundColor':item.color}">{{item.sort}}</li>
    
      </ul>
      <ul>
        <li class="rightindex-title" >标签</li>
        <li v-for="item in blogList" class="licontent">{{item.label}}</li>
      </ul>
      <ul>
        <li class="rightindex-title">最新文章</li>
        <li v-for="item in blogList" class="licontent">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // nav: [
        //         {name: '首页', path: 'index',src:require('../assets/首页.png'),index:'/index'},
        //         {name: '分类', path: 'sort',src:require('../assets/分类.png'),index:'/sort'},
        //         {name: '标签',src:require('../assets/标签.png'),index:'/label'},
        //         {name: '项目',src:require('../assets/项目.png'),index:'/project'},
        //         {name: '关于',src:require('../assets/关于.png'),index:'/about'}
        // ],
      blogList: [],
    };
  },
  created() {
    this.getBlogAllData(); //调用获取所有博客数据方法
  },

  methods: {
    async getBlogAllData() {
      const { data: res } = await this.$http.get("blogAllData");
      if (res.code != 200) return this.$message.error("获取文章失败");
      this.blogList = res.data;
        console.log(this.blogList);
    },

  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  width: 1200px;
  height: 100vh;
  margin: 0 auto;
}
.leftindex {
  width: 200px;
  margin-top: 15px;
  text-align: center;
  height:300px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  color: #000;
}

.searchlabel input {
  width: 170px;
  height: 25px;
  background-image: url(../assets/search.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 150px 2px;
  font-size: 13px;
}
.searchlabel img {
  float: right;
  margin-right: 26px;
}
.leftindex .touxiang {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 16px auto 0px;
}

.leftindex span {
  display: inline-block;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-bottom: 15px;
}
.leftindex .name {
  margin-top: 12px;
  margin-bottom: 4px;
}
.leftindex-main ul li {
  color: aliceblue;
  margin-top: 25px;
  text-align: left;
  margin-left: 15px;
  height: 35px;
}
.leftindex-main img {
  width: 20px;
  height: 20px;
  margin-right: 15px;
  vertical-align: middle;
}
.leftindex .icon {
  position: absolute;
  margin-top: 25px;
  margin-left: 8px;
}
.leftindex .icon img {
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 8px;
}
.leftindex .icon span {
  font-size: 10px;
}
.rightindex {
  height: 100vh;
  width: 200px;    
}
.rightindex-title {
  font-size: 18px;
}
.rightindex ul {
  padding-top: 20px;
  font-family: SimSun;
  font-weight: bold;
}
.rightindex ul li {
  margin-bottom: 10px;
}
.licontent{
  font-size:12px ;
  color: grey;
}

.sort{
  text-align: center;
  border-radius: 5px;
  width: 30px;
  height: 23px;
  font-size: 14px;
  color: #fff;
  border: none;
}
</style>