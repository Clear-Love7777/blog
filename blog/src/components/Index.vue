<template>
  <div class="main">
    <!-- 中间区域 -->
    <div class="mainindex">
      <div class="article" v-for="item in blogList" :key="item.id">
        <div class="mainindex-title">
          {{ item.title }}
        </div>
        <div class="content">
          <div class="mainindex-date" >
            <img src="../assets/日历.png" alt="" />
            <span>{{ item.date | dateFormat }}</span>
          </div>
          <div class="mainindex-sort" v-for="item in sort" >
            <img src="../assets/分类.png" alt="" />
            <span>{{ item.sort }}</span>
          </div>
          <div class="mainindex-label" v-for="item in label" >
            <img src="../assets/标签.png" alt="" />
            <span>{{ item.label }}</span>
          </div>
          <div class="mainindex-countwords">
            <span>字数统计:{{item.content.length}}(字)</span>
          </div>
        </div>
      </div>
    </div>
         <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- {{data}} -->
  </div>
</template>

<script>
export default {
  props:['data'],
  data() {
    return {
      //获取article列表的参数对象
      queryInfo: {
        query: '',
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      blogList: [],
    };
  },
  created() {
    this.getBlogAllData(); //调用获取所有博客数据方法
      this.getSort();
    this.getLabel();
  },
  watch:{
    data(value){
      this.blogList = value
    }
  },
  methods: {
    async getBlogAllData() {
      const { data: res } = await this.$http.post("blogAllData",this.queryInfo)
      if (res.code != 200) return this.$message.error("获取文章失败");
      this.blogList = res.data;
      this.total = res.total;
      this.blogList = this.data
    },
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
    //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getBlogAllData()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getBlogAllData()
  },
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  width: 800px;
  // height: 100vh;
  margin: 0 auto;
  flex-direction: column;
}
.mainindex {
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
.el-pagination{
  margin: 10px auto;
}
</style>