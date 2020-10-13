<template>
     <!-- 中间区域 -->
    <div class="mainindex">
      <div class="article" v-for="item in blogList" :key="item.id">
        <div class="mainindex-title">
          {{ item.title }}
        </div>
        <div class="content">
          <div class="mainindex-date" >
             <i class="el-icon-date"></i>
            <span>{{ item.date | dateFormat }}</span>
          </div>
          <div class="mainindex-sort" >
            <i class="el-icon-menu"></i>
            <span>{{ item.sort }}</span>
          </div>
          <div class="mainindex-label" >
           <i class="el-icon-collection-tag"></i>
            <span>{{ item.label }}</span>
          </div>
          <div class="mainindex-countwords">
            <span>字数统计:{{item.content.length}}(字)</span>
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
    </div>
</template>

<script>
export default {
  data() {
    return {
     queryInfo: {
        query: '',
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      blogList:[],
    };
  },
  created() {
    this.blogAllData(); 
  },

  methods: {
    async blogAllData() {
       this.queryInfo.query = this.$store.state.inputvalue 
      const { data: res } = await this.$http.post("blogAllData",this.queryInfo);
      if (res.code != 200) return this.$message.error("获取文章失败");
      this.blogList = res.data;
      this.total = res.total;
    },
     //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize);
      this.queryInfo.pagesize = newSize
      this.blogAllData()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      //  console.log(newPage);
      this.queryInfo.pagenum = newPage
      this.blogAllData()
  },
  //根据点击的分类标签id获取所有有关此分类的数据
        async getAboutSortData(id){
            const {data:res} = await this.$http.get('/getAboutSortData',{params:{id}})
            if(res.code != 200) return this.$message.error("获取文章失败");
            this.blogList = res.data
        },
  }
};
</script>



<style lang="less" scoped>
.mainindex {
  width: 800px; 
  flex-direction: column;
  .mainindex-title {
    color: black;
    font-size: 20px;
  }
  .content span {
    margin-left: 3px;
  }
  .el-pagination{
    width: 400px;
   margin: 20px auto;
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
.article div {
  font-size: 10px;
  color: grey;
  margin-right: 8px;
}
.mainindex-title {
  margin-bottom: 8px;
}
</style>