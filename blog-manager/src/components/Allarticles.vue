<template>
  <div>
    <!-- 面包屑导航区域
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb> -->
     <!-- 搜索与查找区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getAllArticles">
            <el-button slot="append" icon="el-icon-search" @click="getAllArticles"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加文章</el-button>
        </el-col>
      </el-row>
    <!-- 主体 -->
    <el-table :data="userlist" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="" label="" width="100px"></el-table-column>
      <el-table-column prop="" label="" width="100px"></el-table-column>
      <el-table-column prop="" label=""></el-table-column>
      <el-table-column prop="" label=""></el-table-column>
      <el-table-column prop="phone" label="" ></el-table-column>
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
        <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="money">
          <el-input v-model="editForm.money"></el-input>
        </el-form-item>
          <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
          <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态(启用/冻结)" prop="state">
          <el-input v-model="editForm.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 添加用户对话框 -->
    <el-dialog title="开户" @closed="addDialogClosed" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主体区 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="money">
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
          <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
          <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态(启用/冻结)" prop="state">
          <el-input v-model="addForm.state"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    //验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    //验证手机号规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
       total:0,
      userlist: [],
       //   控制对话框显示和隐藏
      addDialogVisible: false,
      //  添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email:'',
        state: '',
        mobile: '',
        money:'',
      },//   添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3-10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '密码的长度在6-10个字符之间',
            trigger: 'blur',
          },
        ],
      email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
       //控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //查询到的用户对象
      editForm: {},
    }
  },
  created() {
    this.getAllArticles();
  },
  methods: {
    // async getAllArticles() {
    //   const { data: res } = await this.$http.get("getAllArticles",{params:{
    //     query:this.queryInfo.query,
    //     pagenum:this.queryInfo.pagenum,
    //     pagesize:this.queryInfo.pagesize
    //   }})
    //   if (res.code != 200) return this.$message.error(`${res.tips}`);
    //   this.userlist = res.data;
    //   this.total = res.total;
    //    //如果是字符串true 转换为boolean
    //   this.userlist.forEach(item => {
    //       if(item.state === '0'){
    //         item.state = true
    //       }else{
    //         item.state = false
    //       }
    //     }
        
    //   )
    //   console.log(this.userlist);
    // },
      //监听pagesizes 改变的事件
    handleSizeChange(newSize) {
       console.log(newSize);
      this.queryInfo.pagesize = newSize
      this.getalluseraccount()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      //  console.log(newPage);
      this.queryInfo.pagenum = newPage
      this.getalluseraccount()
  },
   //监听添加文章对话框关闭的事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
   //点击按钮添加新文章
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //可以发起添加文章请求
        const { data: res } = await this.$http.post('/addArticles', this.addForm)
        if (res.code !== 200) {
          return this.$message.error('添加失败！')
        }
        this.$message.success('添加成功！')
        this.addDialogVisible = false
        // 重新获取文章列表
        this.getAllArticles()
      })
    },
    //监听switch
    async userStateChange(userinfo){
      var data = Object.assign({},userinfo)
      if(data.state){
          data.state = '0'
      }else{
          data.state = '1'
      }
      console.log(data);
    const { data: res } = await this.$http.put("updatestatus",data)
    if (res.code != 200) {
       userinfo.state = !userinfo.state
       return this.$message.error('更新状态失败');
    } this.$message.success('更新状态成功')
  },
   //展示编辑用户的对话框
    async showEditDialog(data) {
      let obj = Object.assign({},data)
      this.editForm = obj
      this.editDialogVisible = true
    },
//提交编辑的用户信息
 editUserInfo() {
    console.log(this.editForm);
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        //发起修改数据请求
        const { data: res } = await this.$http.put('edituser',this.editForm)
        if (res.code !== 200) {
          return this.$message.error('更新用户信息失败！')
        } 
        //关闭对话框
        this.editDialogVisible = false
        // 重新获取用户列表
        this.getalluseraccount()
        //提示修改成功
        this.$message.success('更新用户信息成功！')
      })
    },
     //监听编辑用户对话框关闭的事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
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
.adduser{
  display: flex;
  justify-content: flex-end;
  margin-top: -14px;
}
.el-row{
  margin-top: 15px;
}
</style>