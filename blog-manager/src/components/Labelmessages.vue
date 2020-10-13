<template>
    <div>
         <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类信息</el-breadcrumb-item>
        </el-breadcrumb>
               <!-- 卡片区域 -->
        <el-card>
            <el-input v-model="labelForm.label_name" width="200px" clearable></el-input>
            <el-button type="primary" @click="addlabel">添加标签</el-button>

            <!-- 表格中的数据 -->
            <el-table :data="labelList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="标签名称" prop="label_name"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" 
                        @click="editLabel(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" 
                        @click="deleteLabel(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </el-card>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            labelForm:{
             label_name:'',
            },
            labelList:[],
        }
    },
    created(){
          this.getLabel()//调用获取分类与标签数据函数
    },
    methods:{
        //获取分类与标签数据函数
       async getLabel() {
      const { data: res } = await this.$http.get("getLabel");
      if (res.code != 200) return this.$message.error("获取分类失败");
      this.labelList = res.data;
    },
     
    }
}
</script>

<style lang="less" scoped>
.el-card{
   margin-top: 20px;
   .el-input{width: 200px!important;}
   .el-button{margin-left: 20px;}
   .el-table{margin: 20px 0;text-align: center;}
}
</style>