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
        <div class="contact">
          <!-- weixin -->
          <div class="wechat"><svg class="icon icon-edit" aria-hidden="true">
            <use xlink:href="#icon-wechat"></use>
          </svg> <div class="Qecard"><img src="../assets/wechat.jpg" alt=""></div></div>
           
           <!-- QQ -->
             <a href="tencent://QQInterLive/?Cmd=2&Uin=1601645717"> 
           <el-tooltip class="item" effect="dark" content="点击添加QQ" placement="top">
          <svg class="icon icon-edit" aria-hidden="true"> 
            <use xlink:href="#icon-QQ" @click=""></use>
          </svg>
             </el-tooltip>
             </a>
             <!-- github -->
            <a href="https://github.com/Clear-Love7777">
           <el-tooltip content="点击进入GitHub" placement="right">
           <svg class="icon icon-edit" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
          </svg>
           </el-tooltip>
            </a>
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
      <ul>
        <li class="rightindex-title"><i class="el-icon-menu"></i>分类</li>
        <div class="rightindex-sort">
          <button
            v-for="item in sort"
            class="sort"
            :key="item.id"
            @click="click_sort(item.id)"
            :style="{ backgroundColor: item.color }"
          >
            {{ item.sort }}
          </button>
        </div>
      </ul>
      <el-divider class="divider"></el-divider>
      <ul class="rightindex-label">
        <li class="rightindex-title">
          <i class="el-icon-collection-tag"></i>标签
        </li>
        <li v-for="item in label" class="licontent">{{ item.label }}</li>
      </ul>
      <el-divider></el-divider>
      <ul class="rightindex-article">
        <li class="rightindex-title">
          <i class="el-icon-document"></i>最新文章
        </li>
        <li v-for="item in article" class="licontent">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputvalue: "", //搜索框数据
      sort: [],
      label: [],
      article: [],
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
    search() {
      this.$store.commit("setValue", this.inputvalue);
      this.$refs.article.blogAllData();
      this.inputvalue = "";
    },
    //调用子组件中方法获取所有有关此分类的数据
    click_sort(id) {
      this.$refs.article.getAboutSortData(id);
    },
    //重载 调用子组件中方法重新获取博客数据
    reload() {
      this.$refs.article.blogAllData();
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
.Qecard{
  margin-top:100px ;
  position: absolute;
  display: none;
}
.Qecard img{
  width: 150px;
  height: 150px;
}
.wechat:hover .Qecard { 
     display: block;
   }
.leftindex {
  width: 200px;
  margin-top: 15px;
  text-align: center;
  height: 300px;
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
  .icon-edit{
    margin-top:15px;
    margin-left:16px;
   float: left;
}

.leftindex .contact span {
  font-size: 12px;
}
.rightindex {
  height: 100vh;
  width: 200px;
}
.rightindex-title {
  font-size: 16px;
}
.rightindex ul {
  margin-top: 20px;
  font-family: SimSun;
  font-weight: bold;
}
.rightindex ul li {
  margin-bottom: 10px;
}
.licontent {
  font-size: 12px;
  color: grey;
}
.rightindex-sort {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 200px;

  button {
    margin-top: 10px;
    margin-right: 15px;
    min-width: 50px;
    height: 20px;
  }
}

.sort {
  text-align: center;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  border: none;
}
</style>