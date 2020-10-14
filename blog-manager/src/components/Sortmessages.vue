<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-input v-model="sortForm.sort_name" width="200px" clearable></el-input>
      <el-button type="primary" @click="addSort">添加分类</el-button>

      <!-- 表格中的数据 -->
      <el-table :data="sortList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="分类名称" prop="sort_name"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteSort(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑分类 -->
    <el-dialog
      title="编辑分类"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editSortsForm" label-width="70px">
        <el-form-item label="分类名" prop="sort_name">
          <el-input v-model="editSortsForm.sort_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSortsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortForm: {
        sort_name: "",
      },
      sortList: [],
      //控制修改对话框显示和隐藏
      editDialogVisible: false,
      //查询到的分类对象
      editSortsForm: {},
    };
  },
  created() {
    this.getSort(); //调用获取分类与标签数据函数
  },
  methods: {
    //获取分类与标签数据函数
    async getSort() {
      const { data: res } = await this.$http.get("getSort");
      if (res.code != 200) return this.$message.error("获取分类失败");
      this.sortList = res.data;
    },
    //添加分类
    async addSort() {
      if (this.sortForm.sort_name.trim() === "")
        return this.$message.error("请输入分类名");
      const { data: res } = await this.$http.post("addSort", this.sortForm);
      this.sortForm.sort_name = "";
      if (res.code != 200) return this.$message.error("添加分类失败");
      this.getSort();
    },
    //根据id删除分类
    async deleteSort(id) {
      //弹框询问是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该分类信息, 是否继续?",
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
      const { data: res } = await this.$http.delete("deleteSort", {
        params: { id },
      });
      if (res.code !== 200) {
        return this.$message.error("删除分类信息失败！");
      }
      //提示修改成功
      this.$message.success("删除分类信息成功！");
      // 重新获取分类列表
      this.getSort();
    },
    //展示编辑分类的对话框
    async showEditDialog(data) {
      let obj = Object.assign({}, data);
      this.editSortsForm = obj;
      this.editDialogVisible = true;
    },
    //提交编辑的信息
    async editSortsInfo() {
      //发起修改数据请求
      const { data: res } = await this.$http.put(
        "editSort",
        this.editSortsForm
      );
      if (res.code !== 200) return this.$message.error("更新分类信息失败！");
      //提示修改成功
      this.$message.success("更新分类信息成功！");
      //关闭对话框
      this.editDialogVisible = false;
      // 重新获取分类列表
      this.getSort();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  .el-input {
    width: 200px !important;
  }
  .el-button {
    margin-left: 20px;
  }
  .el-table {
    margin: 20px 0;
    text-align: center;
  }
}
</style>