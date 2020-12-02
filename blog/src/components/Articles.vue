<template>
  <!-- 中间区域 -->
  <div class="mainindex">
    <div class="article" v-for="item in blogList" :key="item.id">
      <a style="cursor: pointer; text-decoration: none">
        <div class="mainindex-title" @click="changePath(item)">
          {{ item.title }}
        </div>
      </a>
      <div class="content">
        <div class="mainindex-date">
          <i class="el-icon-date"></i>
          <span>{{ item.date | dateFormat }}</span>
        </div>
        <div class="mainindex-sort">
          <i class="el-icon-menu"></i>
          <span>{{ item.sort_name }}</span>
        </div>
        <div class="mainindex-label">
          <i class="el-icon-collection-tag"></i>
          <span>{{ item.label_name }}</span>
        </div>
        <div class="mainindex-countwords">
          <span>字数统计:{{ item.content.length }}(字)</span>
        </div>
        <div class="mainindex-count">
          <span>点赞数:{{ item.count }}</span>
        </div>
        <div class="mainindex-read">
          <span>浏览量:{{ item.readcount }}</span>
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
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      total: 0,
      blogList: [],
    };
  },
  created() {
    this.blogAllData();
  },

  methods: {
    async blogAllData() {
      this.queryInfo.query = this.$store.state.inputvalue;
      const { data: res } = await this.$http.post(
        "blogAllData",
        this.queryInfo
      );
      if (res.code != 200) return this.$message.error("获取文章失败");

      this.blogList = res.data;
      console.log(this.blogList);
      this.total = res.total;
    },
    //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.blogAllData();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      //  console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.blogAllData();
    },
    //监听要查看的博客地址
    changePath(item) {
      this.$store.commit("setMdname", item.mdname);
      this.$router.push({ path: `/content?${item.mdname}` });
      window.sessionStorage.setItem("titleid", item.id);
      this.addRead();
    },
   // 点击标题增加浏览量
        async addRead() {
      var id = window.sessionStorage.getItem("titleid");
        const {data:res} = await this.$http.put("/addRead",{id});
        if(res.code!=200)return this.$message({message:`${res.tips}`,type:"error",duration:1000});
        this.$message({message:`${res.tips}`,type:"success",duration:1000});
      },
    //根据点击的分类标签id获取所有有关此分类的数据

    async getAboutSortData(id) {
      const { data: res } = await this.$http.get("/getAboutSortData", {
        params: { id },
      });
      if (res.code != 200) return this.$message.error("获取文章失败");
      this.blogList = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
@no: 15;
.mainindex {
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  .mainindex-title {
    color: black;
    font-size: 24px;
  }
  .content span {
    margin-left: 5rem / @no;
    font-size: 14px;
  }
  .el-pagination {
    margin-top: 25rem / @no;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
}
.article {
  margin: 25rem / @no 33rem / @no 12rem / @no;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10rem / @no;
  box-shadow: 0 3rem / @no 12rem / @no 0 rgba(0, 0, 0, 0.12);
  padding: 25rem / @no 25rem / @no;
  box-sizing: border-box;
  color: #000;
}
.article div {
  font-size: 12rem / @no;
  color: grey;
  margin-right: 10rem / @no;
}
.mainindex-title {
  margin-bottom: 10rem / @no;
}
</style>