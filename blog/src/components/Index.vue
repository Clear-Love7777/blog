<template>
  <div class="main">
    <!-- 中间区域 -->
    <div class="mainindex">
      <div class="article" v-for="item in blogList">
        <div class="mainindex-title">
          {{ item.title }}
        </div>
        <div class="content">
          <div class="mainindex-date" >
            <img src="../assets/日历.png" alt="" />
            <span>{{ item.date | dateFormat }}</span>
          </div>
          <div class="mainindex-sort">
            <img src="../assets/分类.png" alt="" />
            <span>{{ item.sort }}</span>
          </div>
          <div class="mainindex-label">
            <img src="../assets/标签.png" alt="" />
            <span>{{ item.label }}</span>
          </div>
          <div class="mainindex-countwords">
            <span>字数统计:{{item.content.length}}(字)</span>
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
    },

  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  width: 800px;
  height: 100vh;
  margin: 0 auto;
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