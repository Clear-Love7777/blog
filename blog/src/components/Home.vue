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
            <router-link to="/articles" @click.native="reload"
              ><i class="el-icon-s-home"></i>主页</router-link
            >
          </li>
          <li>
            <router-link to="/share"
              ><i class="el-icon-s-order"></i> 好物分享</router-link
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
            <div class="wechat">
              <svg class="icon icon-edit" aria-hidden="true">
                <use xlink:href="#icon-wechat"></use>
              </svg>
              <div class="Qecard">
                <img src="../assets/wechat.jpg" alt="" />
              </div>
            </div>
            <!-- QQ -->
            <a href="tencent://QQInterLive/?Cmd=2&Uin=1601645717">
              <el-tooltip
                class="item"
                effect="dark"
                content="点击添加QQ"
                placement="top"
              >
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
      <!-- 分类 -->
      <div class="rightindex">
        <ul class="rightindex-sort">
          <li class="rightindex-title"><i class="el-icon-menu"></i> 分类</li>
          <div>
            <button
              v-for="item in sort"
              class="sort"
              :key="item.id"
              @click="click_sort(item.id)"
            >
              {{ item.sort_name }}
            </button>
          </div>
        </ul>
        <!-- 标签
        <ul class="rightindex-label">
          <li class="rightindex-title">
            <i class="el-icon-collection-tag"></i>标签
          </li>
          <li  v-for="(item, index) in label"
            v-if="index < 4"
            :key="index" class="licontent">{{ item.label_name }}</li>
        </ul> -->
        <!-- 最新文章 -->
        <ul class="rightindex-article">
          <li class="rightindex-title">
            <i class="el-icon-document"></i> 最新文章
          </li>
          <li
            v-for="(item, index) in article"
            v-if="index < 5"
            :key="index"
            class="licontent"
          >
            {{ item.title }}
          </li>
        </ul>
        <!-- 评论专区 -->
        <ul class="rightindex-comment">
          <li class="rightindex-title">
            <i class="el-icon-chat-dot-round"></i> 评论专区
          </li>
          <li
            v-for="(item, index) in  comment"
            v-if="index < 5"
            :key="index"
            class="licontent"
          >
           {{item.username}} : {{item.content}}
          </li>
          <li class="morecomment">
            <router-link to="/comment" 
              ><li class="el-icon-thumb"></li>更多评论</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部区域 -->
    <!-- <footer>
      <section>
        <p>Copyright © 2020 - 2021 Designed by June</p>
      </section>
    </footer> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputvalue: "", //搜索框数据
      sort: [], //分类数据
      comment:[],//评论数据
      article: [], //文章
    };
  },

  created() {
    this.getSort();
    this.getNewArticles();
    this.getComment();
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
  watch: {
    $route(to, from) {
      //监听路由变化
      this.disableBtn(to.path);
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    async getSort() {
      const { data: res } = await this.$http.get("getSort");
      if (res.code != 200) return this.$message.error("获取分类失败");
      this.sort = res.data;
    },
    async getNewArticles() {
      const { data: res } = await this.$http.get("getNewArticles");
      if (res.code != 200) return this.$message.error("获取最新文章失败");
      res.data.reverse();
      this.article = res.data;
    },
       async getComment() {
      const { data: res } = await this.$http.get("getComment");
      if (res.code != 200) return this.$message.error("获取最新评论失败");
      res.data.reverse();
      this.comment = res.data;
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
    //强制刷新页面
    // reloadDaily(){
    //      location.reload()
    // },
    //路由发生改变后 禁用button按钮
    disableBtn(path) {
      var btns = document.querySelectorAll(".rightindex-sort button");
      if (path != "/articles") {
        btns.forEach((item) => {
          item.setAttribute("disabled", "true");
          item.style.cursor = "not-allowed";
        });
      } else {
        btns.forEach((item) => {
          item.removeAttribute("disabled");
          item.style.cursor = "pointer";
        });
      }
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
  },
};
</script>

<style lang="less" scoped>
#blog {
  width: 100vw;
  min-height: 100vh;
  // background-color: #f5f8f9;
  position: relative;
  > header {
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  > footer {
    width: 440px;
    box-sizing: border-box;
    position: relative;
    margin-top: 20px;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
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
.buttons {
  position: absolute;
  right: 180px;
}
.el-button {
  width: 60px;
  height: 35px;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
}
.main {
  display: flex;
  width: 1500px;
  height: 100vh;
  margin: 0 auto;
}
main {
  margin-top: 50px;
}
.mainindex {
  flex: 1;
}
.Qecard {
  margin-top: 125px;
  position: absolute;
  display: none;
}
.Qecard img {
  width: 175px;
  height: 175px;
}
.wechat:hover .Qecard {
  display: block;
}
.leftindex {
  width: 250px;
  margin-top: 20px;
  text-align: center;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  color: #000;
}
.searchlabel input {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  background-image: url(../assets/search.png);
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 175px 2px;
  font-size: 16px;
}
.searchlabel img {
  float: right;
}
.leftindex .touxiang {
  display: block;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  margin: 20px auto 0px;
}
.leftindex span {
  display: inline-block;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-bottom: 20px;
}
.leftindex .name {
  margin-top: 15px;
  margin-bottom: 5px;
}

.icon-edit {
  margin-top: 25px;
  margin-left: 40px;
  float: left;
}

.leftindex .contact span {
  font-size: 12px;
}
.rightindex {
  height: 100vh;
  width: 350px;
}
.rightindex-title {
  font-size: 16px;
}
.rightindex ul {
  margin-top: 20px;
  font-family: SimSun;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  padding: 20px 20px;
   li {
  margin-bottom: 12px;
}
.morecomment{
  position: relative;
  float: right;
  font-size: 12px;
    a{
       color: #000;
        transition: color 0.5s;
    }
}
}
.licontent {
  font-size: 16px;
  color: grey;
}
.rightindex-sort {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 350px;
  button {
    margin-top: 10px;
    margin-right: 15px;
    width: 80px;
    height: 20px;
    background-color: rgba(231, 76, 60);
    &:nth-child(2n + 1) {
      background-color: rgba(112, 161, 225);
    }
    &:nth-child(3n) {
      background-color: rgba(112, 196, 169);
    }
  }
}
.sort {
  text-align: center;
  border-radius: 7px;
  font-size: 16px;
  color: #fff;
  border: none;
}
</style>