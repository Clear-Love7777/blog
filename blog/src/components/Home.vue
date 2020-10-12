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
           v-model="inputvalue"
            type="text"
            value=" 搜索"
            onfocus="if(value == defaultValue){value=''}"
            onblur="if(value != defaultValue){value = defaultValue}"
            @click="search"
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

     <div class="mainindex">
       <!-- 路由占位符 -->
       <router-view ref="article"></router-view>
     </div>
   

    <!-- 右边区域 -->
    <div class="rightindex">
      <ul class="rightindex-sort">
        <li class="rightindex-title">分类</li>
        <li  v-for="item in sort" class="sort" :style="{'backgroundColor':item.color}">{{item.sort}}</li>
    
      </ul>
      <ul  class="rightindex-label">
        <li class="rightindex-title" >标签</li>
        <li v-for="item in label" class="licontent">{{item.label}}</li>
      </ul>
      <ul  class="rightindex-article">
        <li class="rightindex-title">最新文章</li>
        <li v-for="item in article" class="licontent">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputvalue:'',//搜索框数据
      sort:[],
      label:[],
      article:[],
    };
  },
  created() {
    this.getSort();
    this.getLabel();
    this.getNewArticles();
  },

  methods: {
    async getSort() {
      const { data: res } = await this.$http.get("getSort");
      if (res.code != 200) return this.$message.error("获取分类失败");
      this.sort = res.data;
    },
    async getLabel() {
      const { data: res } = await this.$http.get("getLabel");
      if (res.code != 200) return this.$message.error("获取标签失败");
      this.label = res.data;
    },
    async getNewArticles() {
      const { data: res } = await this.$http.get("getNewArticles");
      if (res.code != 200) return this.$message.error("获取最新文章失败");
      this.article = res.data;
    },
    search(){
        this.$store.commit("setValue",this.inputvalue)
        this.$refs.article.blogAllData()
        this.inputvalue = ''
    }
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
  border-radius: 5px;
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