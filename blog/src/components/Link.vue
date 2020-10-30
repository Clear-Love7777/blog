<template>
  <div>
    <Header></Header>
    <div class="links">
      <h2>友情链接</h2>
      <div class="content">
        <el-card v-for="(item, index) in links" :key="index" shadow="hover">
          <a :href="item.href" target="_blank">
            <img
              :src="'https://ico.mikelin.cn/' + item.href"
              class="site_icon"
            />
            <span>{{ item.linkname }}</span>
          </a>
          <p>
            {{ item.introduction != null ? item.introduction : item.webname }}
          </p>
        </el-card>
      </div>
      <ApplyLink></ApplyLink>
    </div>
  </div>
</template>

<script>
import Header from "../public/Header";
import ApplyLink from "../public/ApplyLink";
export default {
  data() {
    return {
      links: [],
    };
  },
  components: {
    Header,
    ApplyLink
  },
  created() {
    this.getLinkList();
  },
  methods: {
    async getLinkList() {
      const { data: res } = await this.$http.get("getLinkList");
      if (res.code != 200) return this.$message("获取友链失败");
      this.links = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.links {
  width: 65%;
  margin: 0 auto;
  text-align: center;
  h2 {
    line-height: 100px;
    color: #555;
    font-weight: 500;
  }
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .el-card {
      margin: 0 10px 20px;
      width: 23%;
      box-sizing: border-box;
      text-align: left;
      background-color: unset;
      a {
        color: black;
        display: block;
        img {
          width: 15px;
          height: 15px;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          margin-left: 10px;
        }
      }
       a:hover {
          color:darkturquoise;
        }
      p {
        clear: both;
        display: -webkit-box;
        overflow: hidden;
        margin-top: 1rem;
        height: 60px;
        text-overflow: ellipsis;
        font-size: 13px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-height: 1.5;
      }
    }
  }
  .el-link {
    width: 18%;
    padding: 10px 20px;
    box-sizing: border-box;
    text-align: center;
    background: #e5e9f2;
    margin: 10px;
    img {
      width: 15px;
      height: 15px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>