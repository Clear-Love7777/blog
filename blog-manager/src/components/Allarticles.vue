<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>博客信息</el-breadcrumb-item>
    </el-breadcrumb>
     <!-- 搜索与查找区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="blogAllData">
            <el-button slot="append" icon="el-icon-search" @click="blogAllData"></el-button>
          </el-input>
        </el-col>
      </el-row>
    <!-- 主体 -->
    <el-table :data="blogList" style="width: 100%" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="title" label="标题" ></el-table-column>
      <el-table-column prop="label_name" label="简介"></el-table-column>
      <el-table-column prop="date" label="日期">
         <template slot-scope="scope">
                {{scope.row.date | dateFormat}}
            </template>
      </el-table-column>
      <el-table-column prop="sort_name" label="分类"></el-table-column>
      <el-table-column prop="skill" label="技术" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
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
      //获取文章列表的参数对象
      queryInfo: {
        query: '',
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      blogList: [],
    }
  },
  created() {
    this.blogAllData();
  },
  methods: {
     async blogAllData() {
      const { data: res } = await this.$http.post("blogAllData",this.queryInfo);
      if (res.code != 200) return this.$message.error("获取文章失败");
      this.blogList = res.data;
      this.total = res.total;
    },
      //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.blogAllData()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.blogAllData()
  },
}
}
</script>


<style lang="less" scoped>
.el-table {
  margin-top: 10px;
}
.el-table-column {
  width: auto;
}
.el-row{
  margin-top: 15px;
}
</style>