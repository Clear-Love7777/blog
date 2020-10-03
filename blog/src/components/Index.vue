<template>
  <div class="main">
    <div class="leftindex">
     <div class="leftindex-header">
      <img src="..\assets\logo.jpg" alt="" class="" />
      <span class="name">Jun Xiao</span><br>
      <span>Personal blog</span><br>
    </div>
      <div >

      </div>
    </div>
    <div class="rightindex"></div>
  </div>
</template>


<script>
export default {};
</script>

<style lang="less" scoped>
.leftindex {
  background-color: black;
  height: 100%;
  width: 250px;
  position: absolute;
  top: 0px;
  left: 0px;
  text-align: center;
}
.leftindex img {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left:75px ;
  overflow: hidden;
  margin-top: 16px;
}
.leftindex span {
  display: inline-block;
  color: honeydew;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-bottom: 20px;
}
.leftindex .name{
   margin-top: 12px;
   margin-bottom: 4px;
}
.leftindex-header{
    border-bottom: 0.1px solid  white;
}
.rightindex {
  display: flex;
  flex: 1;
}
</style>