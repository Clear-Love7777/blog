<template>
  <section>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论信息</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索与查找区域 -->
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getComments"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getComments"
            ></el-button>
          </el-input>
        </el-col>
      </el-row> -->
      <!-- 主体 -->
      <el-table :data="commentlist" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="文章题目"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="count" label="赞"></el-table-column>
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">
            {{ scope.row.date | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteComment(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination> -->
    </div>
   
  </section>
</template>
<script>
export default {
  data() {
    return {
      //获取文章列表的参数对象
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
     commentlist: [],
       html:'',
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    date(time){
            const t = new Date(time)
            const y = t.getFullYear()
            const m = (t.getMonth() + 1 + '').padStart(2, '0')
            const d = (t.getDate() + '').padStart(2, '0')
            const hh = (t.getHours() + '').padStart(2, '0')
            const mm = (t.getMinutes() + '').padStart(2, '0')
            const ss = (t.getSeconds() + '').padStart(2, '0')
            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        },
        //获取评论
        async getComments(){
            const {data:res} = await this.$http.get("getComments")
            if(res.code != 200) return this.$message.error("获取评论内容失败");
            this.commentlist = res.data
            console.log(res.data);
        },
    //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getComments();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getComments();
    },
    //根据id删除文章
    async deleteComment(id) {
      //弹框询问是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文章信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果用户确认删除 返回值为字符串 confirm
      //如果用户取消删除 返回值为字符串 cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("deleteComment", {
        params: { id },
      });
      if (res.code !== 200) {
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      }
      //提示修改成功
     this.$message({
        message: `${res.tips}`,
        type: "success",
        duration: 1000,
      });
      // 重新获取评论列表
      this.getComments();
    },

  },
};
</script>


<style lang="less" scoped>
.el-table {
  margin-top: 10px;
}
.el-table-column {
  width: auto;
}
.el-row {
  margin-top: 15px;
}

.el-form{
    margin-top: 20px;
}
.el-pagination{
  margin-top: 10px;
}
</style>