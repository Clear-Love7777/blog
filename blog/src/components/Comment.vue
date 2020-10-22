<template>
    <div class="mainindex">
      <div class="comment" v-for="item in comment" >
          <div class="mainindex-title">
                文章： {{item.title}}
        </div>
        <div class="contentdate">
           <div class="mainindex-content" @click="changePath(item)">
          {{ item.username }}: {{ item.content}}
        </div>
        <div class="mainindex-date" @click="changePath(item)">
        {{ item.date | dateFormat}}
        </div>
         </div>
      </div>
       <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return{
    queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      total:0,
         comment:[],
        }
    },
    created(){
          this.getComments();
    },
    methods:{
        //获取评论
     async getComments() {
      const { data: res } = await this.$http.post("getComments",this.queryInfo);
      if (res.code != 200) return this.$message.error("获取评论失败");
      this.comment = res.data;
      this.total = res.total;
    //   console.log(res.data);
    },
      //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize);
      this.queryInfo.pagesize = newSize;
     this.getComments();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      //  console.log(newPage);
      this.queryInfo.pagenum = newPage;
     this.getComments();
    },
    }
}
</script>

<style lang="less" scoped>
.main-index{
  width: 100%;
  flex-direction: column;
}
  .comment{
     margin: 25px 33px 12px 33px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.12);
  padding: 20px 15px 20px 20px;
  box-sizing: border-box;
  color: #000;
  }
  .mainindex-title{
   font-size: 14px;
   font-weight: bold;
  }
  .mainindex-content{
      font-size: 16px;
  }
  .mainindex-date{
      position: relative;
      float: right;
      font-size: 10px;
  }
div{
    margin-bottom: 10px;
}
 .el-pagination {
    width: 400px;
    margin: 30px auto;
  }
</style>