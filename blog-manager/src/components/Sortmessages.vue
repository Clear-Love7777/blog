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
            <el-button type="primary" @click="addsort">添加分类</el-button>

            <!-- 表格中的数据 -->
            <el-table :data="sortList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="分类名称" prop="sort_name"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" 
                        @click="editSort(scope.row)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" 
                        @click="deleteSort(scope.row)"></el-button>
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
            sortForm:{
             sort_name:'',
            },
            sortList:[],
        }
    },
    created(){
          this.getSort()//调用获取分类与标签数据函数
    },
    methods:{
        //获取分类与标签数据函数
       async getSort() {
      const { data: res } = await this.$http.get("getSort");
      if (res.code != 200) return this.$message.error("获取分类失败");
      this.sortList = res.data;
    },
        //添加分类
        async addsort(){
            if(this.sortForm.sort_name.trim() === '') return this.$message.error("请输入分类名")
            const {data:res} = await this.$http.post("addsort",this.sortForm)
            this.sortForm.sort_name = ''
            if(res.code != 200) return this.$message.error("添加分类失败")
            this.getSort()
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