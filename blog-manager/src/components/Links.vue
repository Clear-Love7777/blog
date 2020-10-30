<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>友情链接</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表格中的数据 -->
      <el-table :data="linkList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="网站名称" prop="linkname"></el-table-column>
        <el-table-column label="介绍" prop="introduction"></el-table-column>
        <el-table-column label="链接" prop="href"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
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
              @click="deleteLink(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑友情链接 -->
    <el-dialog
      title="编辑友情链接"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editLinksForm" label-width="70px">
        <el-form-item label="分类名" prop="linkname">
          <el-input v-model="editLinksForm.linkname"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input v-model="editLinksForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="href">
          <el-input v-model="editLinksForm.href"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editLinksForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLinksInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkForm: {
        linkname: "",
        email: "",
        introduction: "",
        href: "",
      },
      linkList: [],
      //控制修改对话框显示和隐藏
      editDialogVisible: false,
      //查询到的友情链接对象
      editLinksForm: {},
    };
  },
  created() {
    this.getLinkList(); //调用获取友情链接函数
  },
  methods: {
    //获取数据函数
      async getLinkList() {
      const { data: res } = await this.$http.get("getLinkList");
      if (res.code != 200) return this.$message("获取友链失败");
      this.linkList = res.data;
    },
    //根据id删除
    async deleteLink(id) {
      //弹框询问是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该友链信息, 是否继续?",
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
      const { data: res } = await this.$http.delete("deleteLink", {
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
      // 重新获取列表
      this.getLinkList();
    },
    //展示编辑对话框
    async showEditDialog(data) {
      let obj = Object.assign({}, data);
      this.editLinksForm = obj;
      this.editDialogVisible = true;
    },
    //提交编辑的信息
    async editLinksInfo() {
      //发起修改数据请求
      const { data: res } = await this.$http.put(
        "editLinks",
        this.editLinksForm
      );
      if (res.code !== 200)
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      //提示修改成功
      this.$message({
        message: `${res.tips}`,
        type: "success",
        duration: 1000,
      });
      //关闭对话框
      this.editDialogVisible = false;
      // 重新获取列表
      this.getLinkList();
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