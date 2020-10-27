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
              ><i class="el-icon-s-order"></i> 分享</router-link
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
            v-if="index < 5"
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
      this.getLoactionCity();//初始化前获取当前地址
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
    //获取当前地址,使用jsonp解决跨域问题 (get请求)
    async getLoactionCity() {
       const data = await this.$jsonp('https://restapi.amap.com/v3/ip?key=b30eb9c64b4094a062fa5cce3b26496e')
      this.city = data.city;
      // console.log(data);
      this.getWeather(data.city);
    },
    //根据城市获取城市天气
    async getWeather(location) {
      const { data: res } = await this.$http.get(
        `http://wthrcdn.etouch.cn/weather_mini?city=${location}`
      );
      console.log(res.data);
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
      .weatherBox{
        position: relative;
        top: 83vh;
        right: 30px;
        box-sizing: border-box;
        height: 100vh;
        display: flex;
        flex-direction: column;
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
#blog .weatherBox{
    i{
        padding: 12px 12px;
        background-color: #eee;
        border-radius: 50%;
        cursor: pointer;
        transition: color .25s;
    }
    .weather{
        position: relative;
        >div{
            position: absolute;
            top: 40px;
            left: -1px;
            transform: translate(-100%,-100%);
            width: 290px;
            height: 300px;
            border-radius: 5px;
            padding: 10px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: rgba(0,0,0, .2);
            backdrop-filter: blur(2px);
            background: url(https://s1.ax1x.com/2020/10/27/BQlUt1.jpg) no-repeat center;
            background-size: cover;
            header{
                display: flex;
                justify-content: space-between;
                color: #fff;
                font-size: 14px;
            }
            main{
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                padding-bottom:10px ;
                span:first-child{font-size: 50px;}
                span:last-child{
                    font-size: 14px;
                    background-color: #1e90ff;
                    border-radius: 5px;
                    padding: 2px 5px;
                }
                border-bottom: 1px solid #fff;
            }
            footer{
                color: #fff;
                td{width: 25%;}
            }
        }
        i{margin: 10px 0;}
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
  .morecomment {
    position: relative;
    float: right;
    font-size: 12px;
    a {
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