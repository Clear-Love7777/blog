<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表格中的数据 -->
      <el-table :data="messageList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="用户名" prop="nickname"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="发表时间" prop="create_time">
            <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="站长回复" prop="reply"></el-table-column>
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
              @click="deleteMessage(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑留言信息 -->
    <el-dialog
      title="编辑留言信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form :model="editMessagesForm" label-width="70px">
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="editMessagesForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editMessagesForm.content"></el-input>
        </el-form-item>
        <el-form-item label="发表时间" prop="create_time">
        <el-date-picker
              v-model="editMessagesForm.create_time"
              type="datetime"
              placeholder="选择日期时间"
              style="width: 100%"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editMessagesForm.email"></el-input>
        </el-form-item>
         <el-form-item label="站长回复" prop="reply">
          <el-input v-model="editMessagesForm.reply"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMessagesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageForm: {
        nickname: "",
        email: "",
       content: "",
         create_time: "",
           reply: "",
      },
      messageList: [],
      //控制修改对话框显示和隐藏
      editDialogVisible: false,
      //查询到的友情链接对象
      editMessagesForm: {},
    };
  },
  created() {
    this.getMessages(); //调用获取友情链接函数
  },
  methods: {
         date(time) {
      const t = new Date(time);
      const y = t.getFullYear();
      const m = (t.getMonth() + 1 + "").padStart(2, "0");
      const d = (t.getDate() + "").padStart(2, "0");
      const hh = (t.getHours() + "").padStart(2, "0");
      const mm = (t.getMinutes() + "").padStart(2, "0");
      const ss = (t.getSeconds() + "").padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    },
    //获取数据函数
      async getMessages() {
      const { data: res } = await this.$http.get("getMessages");
      if (res.code != 200) return this.$message("获取留言失败");
      this.messageList = res.data;
    },
    //根据id删除
    async deleteMessage(id) {
      //弹框询问是否删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该留言信息, 是否继续?",
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
      const { data: res } = await this.$http.delete("deleteMessage", {
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
      this.getMessages();
    },
    //展示编辑对话框
    async showEditDialog(data) {
      let obj = Object.assign({}, data);
      this.editMessagesForm = obj;
      this.editDialogVisible = true;
    },
    //提交编辑的信息
    async editMessagesInfo() {
        //处理时间
     this.editMessagesForm.create_time = this.date(this.editMessagesForm.create_time);
      //发起修改数据请求
      const { data: res } = await this.$http.put(
        "editMessages",
        this.editMessagesForm
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
      this.getMessages();
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  .el-button {
    margin-left: 20px;
  }
  .el-table {
    margin: 20px 0;
    text-align: center;
  }
}
</style>