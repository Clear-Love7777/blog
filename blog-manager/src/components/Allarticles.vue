<template>
  <section>
    <div>
      <!-- 面包屑导航区域 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>博客信息</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索与查找区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="blogAllData"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="blogAllData"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 主体 -->
      <el-table :data="blogList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="introduce" label="简介"></el-table-column>
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">
            {{ scope.row.date | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="sort_name" label="分类"></el-table-column>
        <el-table-column prop="mdname" label="文件"></el-table-column>
        <el-table-column prop="label_name" label="标签"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editBlog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteArticle(scope.row.id)"
            ></el-button>
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
    <!-- 编辑博客对话框 -->
    <el-dialog title="编辑博客" :visible.sync="editBlogDialog" width="50%">
      <el-button type="primary" @click="clickToBtn" v-show="showTo"
        >下一步</el-button
      >
      <el-button type="primary" @click="clickBackBtn" v-show="showBack"
        >上一步</el-button
      >
      <el-button type="primary" @click="updateBlog" v-show="showBack"
        >更新</el-button
      >
      <el-row :gutter="2" v-show="showTo">
        <el-col :span="12">
          <el-input type="textarea" v-model="blogForm.content" class="textarea">
          </el-input>
        </el-col>
        <el-col :span="12">
          <div
            v-html="html"
            v-highlight
            class="markdown-body md"
            v-show="showMd"
          ></div>
        </el-col>
      </el-row>
      <div v-show="showBack">
        <el-form :model="blogForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="blogForm.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input type="textarea" v-model="blogForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="blogForm.date"
              type="datetime"
              placeholder="选择日期时间"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="blogForm.sort_name"
              filterable
              allow-create
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in sortList"
                :key="item.id"
                :label="item.sort_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件名">
            <el-input v-model="blogForm.mdname" clearable></el-input>
          </el-form-item>
          <el-form-item label="技术">
            <el-select
              v-model="blogForm.label_name"
              filterable
              allow-create
              placeholder="请选择技术"
            >
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.label_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import showdown from "showdown";
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
      blogList: [],
       html:'',
      showMd: false,
      showTo: true,
      showBack: false,
      sortList: [], //分类数据
      labelList: [], //标签数据
      blogForm: {
        //添加博客表单数据
        title: "",
        introduce: "",
        date: "",
        sort_name: "",
        mdname: "",
        label_name: "",
        content: "",
      },
     editBlogDialog: false, //控制编辑博客对话框的显示与隐藏
      oldSname: "",
      oldLname: "",
    };
  },
  created() {
    this.blogAllData();
  },
  watch: {
    "blogForm.content"(value) {
      if (value == "") return (this.showMd = false);
      this.showMd = true;
      let converter = new showdown.Converter();
      this.html = converter.makeHtml(value);
    },
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
    //获取博客数据
    async blogAllData() {
      const { data: res } = await this.$http.post(
        "blogAllData",
        this.queryInfo
      );
      if (res.code != 200) return this.$message.error("获取文章失败");
      this.blogList = res.data;
      this.total = res.total;
    },
        //获取分类与标签数据
        async getSLData(){
            const {data:res} = await this.$http.get("blogdatadetail")
            if(res.code != 200) return this.$message.error("获取文章失败");
            this.sortList = res.data.data
            this.labelList = res.data.data2
        },
    //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.blogAllData();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.blogAllData();
    },
    //根据id删除文章
    async deleteArticle(id) {
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
      const { data: res } = await this.$http.delete("deleteArticle", {
        params: { id },
      });
      if (res.code !== 200) {
        return this.$message.error("删除失败！");
      }
      //提示修改成功
      this.$message.success("删除分类信息成功！");
      // 重新获取博客列表
      this.blogAllData();
    },
    //编辑博客
    editBlog(value) {
      this.blogForm = value;
      this.editBlogDialog = true;
      this.oldSname = this.blogForm.sort_name;
      this.oldLname = this.blogForm.label_name;
    },
    clickToBtn() {
      this.showTo = false;
      this.showBack = true;
      this.getSLData();
    },
    clickBackBtn() {
      this.showTo = true;
      this.showBack = false;
    },
    async updateBlog() {
      this.dealBlogForm();
      const { data: res } = await this.$http.put("updateblog", this.blogForm);
      if (res.code != 200) return this.$message.error("更新失败！");
      this.blogAllData();
      this.showTo = true;
      this.showBack = false;
      this.editBlogDialog = false;
    },
    //处理传入后端的值
    dealBlogForm(){
        if(this.blogForm.sort_name == this.oldSname)
        this.blogForm.sort_name = this.blogForm.sortId
        if(this.blogForm.label_name == this.oldLname)
        this.blogForm.label_name = this.blogForm.labelId
        if(!this.blogForm.mdname.split('.').includes('md')){this.blogForm.mdname += '.md'}
        this.blogForm.date = this.date(this.blogForm.date)
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
.el-dialog .el-row{
   .textarea{
       height: 500px;
       margin-top: 20px;
   }
   .md{
       height: 500px;
       border-radius: 4px;
       padding: 0 5px; 
       margin-top: 20px;
       border: 1px solid #DCDFE6;
       overflow-y: scroll;
       overflow-x: hidden;
   }
}
.el-form{
    margin-top: 20px;
}
.el-pagination{
  margin-top: 10px;
}
</style>