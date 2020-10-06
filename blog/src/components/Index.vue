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
          /><br />
        </div>
      </div>
      <div class="leftindex-main">
        <ul>
          <li><img src="..\assets\首页.png" alt="" />首页</li>
          <li><img src="..\assets\分类.png" alt="" />分类</li>
          <li><img src="..\assets\标签.png" alt="" />标签</li>
          <li><img src="..\assets\项目.png" alt="" />项目</li>
          <li><img src="..\assets\关于.png" alt="" />关于</li>
        </ul>
      </div>
      <div class="icon">
        <img src="..\assets\wechat.png" alt="" class="wechat" />
        <img src="..\assets\QQ.png" alt="" class="QQ" />
        <img src="..\assets\email.png" alt="" class="email" /> <br />
        <span>Contact me through these channels</span>
      </div>
    </div>

    <!-- 中间区域 -->
    <div class="mainindex">
      <div class="article" v-for="item in blogList">
        <div class="mainindex-title">
          {{ item.title }}
        </div>
        <div class="content">
          <div class="mainindex-date" >
            <img src="..\assets\日历.png" alt="" />
            <span>{{ item.date | dateFormat }}</span>
          </div>
          <div class="mainindex-sort">
            <img src="..\assets\分类.png" alt="" />
            <span>{{ item.sort }}</span>
          </div>
          <div class="mainindex-label">
            <img src="..\assets\标签.png" alt="" />
            <span>{{ item.label }}</span>
          </div>
          <div class="mainindex-countwords">
            <span>字数统计:{{item.content.length}}(字)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右边区域 -->
    <div class="rightindex">
      <ul>
        <li class="rightindex-title">公告</li>
        <li>欢迎交流和分享经验！</li>
      </ul>
      <ul>
        <li class="rightindex-title">分类</li>
        <li  v-for="item in blogList">{{item.sort}}</li>
    
      </ul>
      <ul>
        <li class="rightindex-title" >标签</li>
        <li v-for="item in blogList">{{item.label}}</li>
      </ul>
      <ul>
        <li class="rightindex-title">标签云</li>
        <li>...</li>
      </ul>
      <ul>
        <li class="rightindex-title">归档</li>
        <li>...</li>
      </ul>
      <ul>
        <li class="rightindex-title">最新文章</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      console.log(res.data);
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
  background-color: black;
  height: 100vh;
  width: 200px;
  text-align: center;
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
  color: honeydew;
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
  bottom: 0px;
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
  font-size: 16px;
}

.mainindex {
  flex: 1;
  .mainindex-title {
    color: black;
    font-size: 20px;
  }
  .content span {
    margin-left: 3px;
  }
}
.content {
  display: flex;
}
.article {
  margin: 20px 30px 10px 30px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px 20px;
  box-sizing: border-box;
  color: #000;
}
.article img {
  width: 10px;
  height: 10px;
}
.article div {
  font-size: 10px;
  color: grey;
  margin-right: 8px;
}
.mainindex-title {
  margin-bottom: 8px;
}
</style>