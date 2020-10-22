<template>
  <div class="Beauty">
    <el-input
      type="textarea"
      :rows="14"
      placeholder="请输入CSS代码"
      v-model="textarea"
    >
    </el-input>
    <el-button type="success" plain>压缩</el-button>
    <el-button type="success" plain>美化</el-button>
    <el-button type="success" plain>清空</el-button>
  </div>
</template>


<script>
export default {};
</script>

<style lang="less" scoped>
.Beauty {
  height: 100%;
}
.el-button {
  margin-top: 20px;
  margin-right: 15px;
}
</style>