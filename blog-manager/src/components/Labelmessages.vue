<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-input
        v-model="labelForm.label_name"
        width="200px"
        clearable
      ></el-input>
      <el-button type="primary" @click="addLabel">添加标签</el-button>

      <!-- 表格中的数据 -->
      <el-table :data="labelList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="标签名称" prop="label_name"></el-table-column>
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
              @click="deleteLabel(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      <!-- 编辑标签 -->
    <el-dialog
      title="编辑标签"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editLabelsForm" label-width="70px">
        <el-form-item label="标签名" prop="label_name">
          <el-input v-model="editLabelsForm.label_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLabelsInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelForm: {
        label_name: "",
      },
      labelList: [],
      //控制修改对话框显示和隐藏
      editDialogVisible: false,
        //查询到的分类对象
      editLabelsForm: {},
    };
  },
  created() {
    this.getLabel(); //调用获取分类与标签数据函数
  },
  methods: {
    //获取分类与标签数据函数
    async getLabel() {
      const { data: res } = await this.$http.get("getLabel");
      if (res.code != 200) return this.$message.error("获取标签失败");
      this.labelList = res.data;
    },
    //添加标签
    async addLabel() {
      if (this.labelForm.label_name.trim() === "")
        return this.$message.error("请输入标签名");
      const { data: res } = await this.$http.post("addLabel", this.labelForm);
      this.labelForm.label_name = "";
      if (res.code != 200) return this.$message.error("添加标签失败");
      this.getLabel();
    },
    //根据id删除标签
    async deleteLabel(id) {
      //弹框询问是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该标签信息, 是否继续?",
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
      const { data: res } = await this.$http.delete("deleteLabel", {
        params: { id },
      });
      if (res.code !== 200) {
        return this.$message.error("删除标签信息失败！");
      }
      //提示修改成功
      this.$message.success("删除标签信息成功！");
      // 重新获取标签列表
      this.getLabel();
    },
     //展示编辑标签的对话框
    async showEditDialog(data) {
      let obj = Object.assign({}, data);
      this.editLabelsForm = obj;
      this.editDialogVisible = true;
    },
    //提交编辑的信息
    async editLabelsInfo() {
      //发起修改数据请求
      const { data: res } = await this.$http.put(
        "editLabel",
        this.editLabelsForm
      );
      if (res.code !== 200) return this.$message.error("更新标签信息失败！");
      //提示修改成功
      this.$message.success("更新标签信息成功！");
      //关闭对话框
      this.editDialogVisible = false;
      // 重新获标签列表
      this.getLabel();
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