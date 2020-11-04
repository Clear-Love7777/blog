<template>
  <div id="blog">
    <!-- 头部导航 -->
    <header class="header2">
      <el-dropdown>
  <el-button  >
    菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
      <router-link to="/login" 
              ><span style="color:black"  v-show="btnLogin">登录</span></router-link
            >
    </el-dropdown-item>
    <el-dropdown-item>
       <router-link to="/articles" @click.native="reload"
              ><svg class="homeicon">
                  <use xlink:href="#icon-home" style="color:black"></use>
                </svg><span style="color:black">主页</span></router-link
            >
    </el-dropdown-item>
   
    <el-dropdown-item>
      <router-link to="/messageBoard"  @click.native="messagereload"
              ><i class="el-icon-edit" style="color:black"></i><span style="color:black">留言板</span></router-link
            >
    </el-dropdown-item>
      <el-dropdown-item>
      <router-link to="/other"
              ><i class="el-icon-more-outline" style="color:black"></i><span style="color:black">其他</span></router-link
            >
    </el-dropdown-item>
    <el-dropdown-item>
      <router-link to="/link"
              ><i class="el-icon-connection" style="color:black"></i> <span style="color:black">友情链接</span></router-link
            >
    </el-dropdown-item>
   <el-dropdown-item>
     <span style="color:black"  @click="logout"
              v-show="btnLogout" >退出</span> 
    </el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      <span>JuneBlog</span>
    </header>
    <header>
      <section>
        <a href="javascript:void(0);">
          <img src="https://s1.ax1x.com/2020/11/04/BcKfBV.jpg" alt="" />
          <span>June</span>
        </a>
        <nav>
          <li>
            <router-link to="/articles" @click.native="reload"
              ><svg class="homeicon">
                  <use xlink:href="#icon-home"></use>
                </svg>主页</router-link
            >
          </li>
            <li>
            <router-link to="/messageBoard"  @click.native="messagereload"
              ><i class="el-icon-edit"></i> 留言板</router-link
            >
          </li>
             <li>
            <router-link to="/link"
              ><i class="el-icon-connection"></i> 友情链接</router-link
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
    <div class="main">
      <!-- 左侧区域 -->
      <div class="leftindex">
        <div class="leftindex-header">
          <img src="https://s1.ax1x.com/2020/11/04/BcKfBV.jpg" alt="" class="touxiang" />
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
                <img src="https://s1.ax1x.com/2020/11/04/BcQQiD.jpg" alt="" />
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
          <li class="rightindex-title"><i class="el-icon-menu"></i> 标签云</li>
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
        <!-- 最新文章 -->
        <ul class="rightindex-article">
          <li class="rightindex-title">
            <i class="el-icon-document"></i> 最新文章
          </li>
          <li
            v-for="(item, index) in article"
            v-if="index < 3"
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
            v-for="(item, index) in comment"
            v-if="index < 3"
            :key="index"
            class="licontent"
          >
            {{ item.username }} : {{ item.content }}
          </li>
          <li class="morecomment">
            <router-link to="/comment"
              ><li class="el-icon-thumb"></li>
              更多评论</router-link
            >
          </li>
        </ul>
      </div>
        <!-- 右下角 -->
      <div class="weatherBox">
        <!-- 天气盒子 -->
        <div class="weather">
          <!-- <i :class="flag?'el-icon-heavy-rain backtopBlack':'el-icon-heavy-rain backtopWhite'"  -->
          <i
            :class="className"
            @mouseenter="showWeather = true"
            @mouseleave="showWeather = false"
          ></i>
          <div
            v-show="showWeather"
            @mouseenter="showWeather = true"
            @mouseleave="showWeather = false"
          >
            <header>
              <label>{{ city }}</label
              ><span>简约天气</span>
            </header>
            <main>
              <span>{{ wendu }}</span
              ><span>{{ type }}</span>
            </main>
            <footer>
              <table>
                <tr v-for="(item, index) in weatherList" :key="index">
                  <td align="center">{{ item.date }}</td>
                  <td align="center">{{ item.type }}</td>
                  <td align="center">{{ item.wendu }}</td>
                  <td align="center">{{ item.fengxiang }}</td>
                </tr>
              </table>
            </footer>
          </div>
        </div>
        </div>
      </div>
           
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "", //当前城市
      weatherList: [], //最近三天天气数据
      wendu: "", //当天平均温度
      type: "", //当天天气状态
      showWeather: false,
      inputvalue: "", //搜索框数据
      sort: [], //分类数据
      comment: [], //评论数据
      article: [], //文章
    };
  },
  computed: {
    className() {
      let className = "";
      if (!this.flag) {
        if (this.type == "晴") {
          className = "el-icon-sunny " + "backtopWhite";
        } else if (this.type == "多云") {
          className = "el-icon-cloudy " + "backtopWhite";
        } else {
          className = "el-icon-heavy-rain " + "backtopWhite";
        }
      } else {
        if (this.type == "晴") {
          className = "el-icon-sunny " + "backtopBlack";
        } else if (this.type == "多云") {
          className = "el-icon-cloudy " + "backtopBlack";
        } else {
          className = "el-icon-heavy-rain " + "backtopBlack";
        }
      }
      return className;
    },
  },
  created() {
    this.getSort();
    this.getNewArticles();
    this.getComment();
    //调用控制登录登出状态函数
    this.getStatus();
    this.getLoactionCity(); //初始化前获取当前地址
    //禁止鼠标右键点击
    (document.oncontextmenu = () => {
      event.returnValue = false;
    })
      // 禁用选择
      // (document.onselectstart = () => {
      //   event.returnValue = false;
      // });
  },
  watch: {
    $route(to, from) {
      //监听路由变化
      this.disableBtn(to.path);
    },
  },
  methods: {
    //获取当前地址,使用jsonp解决跨域问题 (get请求)
    async getLoactionCity() {
      const data = await this.$jsonp(
        "https://restapi.amap.com/v3/ip?key=b30eb9c64b4094a062fa5cce3b26496e"
      );
      this.city = data.city;
      // console.log(data);
      this.getWeather(data.city);
    },
    //根据城市获取城市天气
    async getWeather(location) {
      const { data: res } = await this.$http.get(
        `http://wthrcdn.etouch.cn/weather_mini?city=${location}`
      );
      // console.log(res.data);
      if (res.status !== 1000) return this.$message.error("获取天气数据失败");
      const value = res.data.forecast.slice(0, 3);
      this.handleWeatherData(value);
    },
    //处理天气数据
    handleWeatherData(value) {
      value.map((item, index) => {
        if (index == 0) {
          item.date = "今天";
        } else if (index == 1) {
          item.date = "明天";
        } else {
          item.date = "后天";
        }
        item.wendu = item.low.split(" ")[1] + "/" + item.high.split(" ")[1];
      });
      this.weatherList = value;
      this.wendu =
        (Number(value[0].high.slice(3, 5)) + Number(value[0].low.slice(3, 5))) /
          2 +
        "℃";
      this.type = value[0].type;
    },
    // 跳转到登录
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
    messagereload(){
     location.reload();
    },
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
@no: 15;
#blog {
  width: 100%;
  height: 100%;
  > header {
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  > .header2 {
  
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    .el-dropdown{
        position: absolute;
        top:14px;
        left:14px;
    }
    span {
      font-size: 24px;
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
    }
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
    .buttons {
      position: absolute;
      right: 10%;
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
#blog .weatherBox {
  position: fixed;
  top: 90%;
  right: 9%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  i {
    padding: 12rem / @no 12rem / @no;
    background-color: #eee;
    border-radius: 50%;
    cursor: pointer;
    transition: color 0.25s;
  }
  .weather {
    position: relative;
    > div {
      position: absolute;
      top: 50rem / @no;
      left: -1rem / @no;
      transform: translate(-100%, -100%);
      width: 220rem / @no;
      height: 240rem / @no;
      border-radius: 5rem / @no;
      padding: 10rem / @no 10rem / @no;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(2rem / @no);
      background: url(https://s1.ax1x.com/2020/10/27/BQlUt1.jpg) no-repeat
        center;
      background-size: cover;
      header {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 14rem / @no;
      }
      main {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding-bottom: 10rem / @no;
        span:first-child {
          font-size: 50rem / @no;
        }
        span:last-child {
          font-size: 14rem / @no;
          background-color: #1e90ff;
          border-radius: 5rem / @no;
          padding: 2rem / @no 5rem / @no;
        }
        border-bottom: 1rem / @no solid #fff;
      }
      footer {
        color: #fff;
        td {
          width: 25%;
        }
      }
    }
    i {
      margin: 10rem / @no 0;
    }
  }
}

.buttons {
  margin-right: 10px;
  .el-button {
    width: 60px;
    height: 35px;
    font-size: 14px;
    padding: 10% 15% !important;
  }
}
.main {
  display: flex;
  min-width: 80vw;
  max-width: 80vw;
  height: 100%;
  margin: 0 auto;
}

.mainindex {
  flex: 1;
  width: 0;
}
.Qecard {
  top: 440rem / @no;
  left: 180rem / @no;
  position: absolute;
  display: none;
}
.Qecard img {
  width: 250rem / @no;
  height: 250rem / @no;
}
.wechat:hover .Qecard {
  display: block;
}

.leftindex {
  width: 230px;
  margin-top: 20px;
  text-align: center;
  height: 23.5%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  color: #000;
}

.searchlabel input {
  width: 80%;
  height: 30rem / @no;
  border-radius: 5rem / @no;
  background-image: url(https://s1.ax1x.com/2020/11/04/BcQyyn.png);
  background-size: 25rem / @no 25rem / @no;
  background-repeat: no-repeat;
  background-position: 95% 2rem / @no;
  font-size: 16rem / @no;
}
.searchlabel img {
  float: right;
}
.leftindex .touxiang {
  display: block;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  margin: 20rem / @no auto;
}
.leftindex span {
  display: inline-block;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-bottom: 20rem / @no;
}
.leftindex .name {
  margin-top: 15rem / @no;
  margin-bottom: 5rem / @no;
}

.icon-edit {
  margin-top: 25rem / @no;
  margin-left: 19%;
  float: left;
}

.leftindex .contact span {
  font-size: 12rem / @no;
}
.rightindex {
  height: 100%;
  width: 250px;
}
.rightindex-title {
  font-size: 16px;
}
.rightindex ul {
  margin-top: 18px;
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
  .morecomment {
    position: relative;
    float: right;
    font-size: 14px;
    a {
      color: #000;
      transition: color 0.5s;
    }
  }
}
.licontent {
  font-size: 14px;
  color: grey;
}
.rightindex-sort {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  button {
    margin-top: 10px;
    margin-right: 10px;
    width: 27%;
    height: 24px;
    padding: 0px 1%;
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
  font-size: 13px;
  color: #fff;
  border: none;
}
</style>