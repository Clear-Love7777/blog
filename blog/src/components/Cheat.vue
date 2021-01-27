<template>
  <div id="cheat">
    <h2>{{ title }}</h2>
    <div class="line"></div>
    <!-- 内容 -->
    <ul>
      <li v-for="(item, index) in cheatList">
        <span class="value"   :class="{ done: !item.isDone }">
          {{ index + 1 }}.{{ item.value }}
        </span>
        <span class="cheatdate">{{ item.date | dateFormat }}</span>
        <div class="buttons">
          <el-button
            @click="showEditDialog(item)"
            size="mini"
            type="primary"
            round
            >编辑</el-button
          >
          <el-button
            @click="doneIt(item)"
            size="mini"
            type="success"
           :class="{ doneBtn: !item.isDone }"
            round
          >         
            <span v-show="!item.isDone">恢复</span
            ><span v-show="item.isDone">完成</span>
          </el-button>
          <el-button
            @click="deleteTasks(item.id)"
            size="mini"
            type="danger"
            round
            >删除</el-button
          >
        </div>
      </li>
    </ul>
    <!-- 点击添加计划 -->
    <p>
      <span class="add-item" @click="addIt">{{ note }}</span>
    </p>
    <!-- 编辑任务 -->
    <el-dialog title="任务" :visible.sync="editFormVisible" :modal-append-to-body='false'>
      <el-form :model="editCheatForm">
        <el-form-item label="任务">
          <el-input v-model="editCheatForm.value"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="editCheatForm.date"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCheatsInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加任务对话框 -->
    <el-dialog title="任务" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
      <el-form :model="addingDraft">
        <el-form-item>
          <el-input
            v-model="addingDraft.value"
            autocomplete="off"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 8 }"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-date-picker
          v-model="addingDraft.date"
          type="datetime"
          placeholder="选择日期"
          style="width: 100%"
        >
        </el-date-picker>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTasks">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "每日备忘录",
      note: "点击添加新计划 !",
      //控制编辑对话框显示和隐藏
      editFormVisible: false,
      //控制添加对话框显示和隐藏
      dialogFormVisible: false,
      addingDraft: {
        value: "",
        date: "",
        isDone: 1,
      },
      cheatList: [],
      editCheatForm: {},
    };
  },
  created() {
    this.getTasks();
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
    //   显示添加任务对话框
    addIt() {
      this.dialogFormVisible = true;
    },
    // 获取任务
    async getTasks() {
      const { data: res } = await this.$http.get("/getTasks");
      this.cheatList = res.data;
    //   console.log( res.data);
      //如果是字符串true 转换为boolean
      this.cheatList.forEach((item) => {
        //   console.log(typeof item.isDone );
        if (item.isDone === "0") {
          item.isDone = false;
        } else {
          item.isDone = true;
        }
      });
      if (res.code != 200)
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
    },
    //添加任务
    async addTasks() {
      this.addingDraft.date = this.date(this.addingDraft.date);
      const { data: res } = await this.$http.post(
        "/addTasks",
        this.addingDraft
      );
      //   console.log(this.addingDraft);
      if (res.code != 200)
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      this.addingDraft = {
        value: "",
        date: "",
        isDone: "",
      };
      this.dialogFormVisible = false;
      this.getTasks();
    },
    // 删除任务
    async deleteTasks(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该信息, 是否继续?",
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
      const { data: res } = await this.$http.delete("deleteTasks", {
        params: { id },
      });
      if (res.code !== 200)
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      this.$message({
        message: `${res.tips}`,
        type: "success",
        duration: 1000,
      });
      // 重新获取任务列表
      this.getTasks();
    },
    //展示编辑分类的对话框
    async showEditDialog(data) {
      let obj = Object.assign({}, data);
      this.editCheatForm = obj;
      this.editFormVisible = true;
      this.editCheatForm.date = this.date(this.editCheatForm.date);
    },
    // 提交编辑的信息
    async editCheatsInfo() {
      const { data: res } = await this.$http.put(
        "editCheat",
        this.editCheatForm
      );
      if (res.code !== 200)
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      this.$message({
        message: `${res.tips}`,
        type: "success",
        duration: 1000,
      });
      // 隐藏对话框
      this.editFormVisible = false;
      this.getTasks();
    },
    async doneIt(value) { 
        let copyObj=Object.assign({},value)
        // console.log(copyObj);
        copyObj.isDone =!copyObj.isDone
      if (copyObj.isDone) {
        copyObj.isDone = 1;
      } else {
        copyObj.isDone = 0;
      }
      const { data: res } = await this.$http.put("doneIt", copyObj);
      if (res.code != 200) {
        return this.$message({
          message: `${res.tips}`,
          type: "error",
          duration: 1000,
        });
      }
      this.$message({
        message: `${res.tips}`,
        type: "success",
        duration: 1000,
      });
      this.getTasks()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
@no:15;
#cheat {
  position: relative;
  display: inline-block;
  min-height: 300rem/@no;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px 20px;
  box-sizing: border-box;
  color: #000;
}
.line {
  border: 1px solid #ddd;
  margin: 10px 0;
  width: 800rem/@no;
}
h2 {
  font-size: 25px;
  color: #42b983;
  margin-bottom: 10px;
}
p > span {
  font-size: 16px;
  color: #42b983;
  cursor: pointer;
  margin-left: 2px;
  position: absolute;
  bottom: 15px;
}
p > span.add-item {
  text-decoration: underline;
}
p > span.add-item:hover {
  font-size: 16rem/@no;
  color: orange;
  font-weight: bold;
  text-decoration: none;
}
.cheatdate {
  font-size: 12rem/@no;
  margin-left: 50rem/@no;
}
.buttons {
  float: right;
}
.value {
  font-size: 18px;
}
ul li {
  margin-bottom: 30px;
}
.done {
  text-decoration: line-through;
  color: #aaa;
}
.doneBtn {
  background-color: #bbb;
  border-color: #bbb;
}
</style>