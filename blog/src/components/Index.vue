<template>
  <div class="main">
    <div class="leftindex">
      <div class="leftindex-header">
        <img src="..\assets\logo.jpg" alt="" class="touxiang" />
        <span class="name">Jun Xiao</span><br />
        <span>Personal blog</span><br />
        <div class="searchlabel">
        <input type="text" value=" 搜索"   onfocus="if(value == defaultValue){value=''}" onblur="if(!value){value = defaultValue}"><br />
        </div>
      </div>
      <div class="leftindex-main">
        <ul>
          <li><img src="..\assets\首页.png" alt=""/>首页</li>
          <li><img src="..\assets\分类.png" alt=""/>分类</li>
          <li><img src="..\assets\标签.png" alt=""/>标签</li>
          <li><img src="..\assets\项目.png" alt=""/>项目</li>
          <li><img src="..\assets\关于.png" alt=""/>关于</li>
        </ul>
      </div>
      <div class="icon">
         <img src="..\assets\wechat.png" alt=""  class="wechat"/>
         <img src="..\assets\QQ.png" alt=""  class="QQ"/>
        <img src="..\assets\email.png" alt=""  class="email"/> <br>
        <span>Contact me through these channels</span>
        </div>
    </div>
    <div class="mainindex">
   <!-- <div class='time-line'>
	 <div class='time-line-div' >
		<p>{{item.time}}</p>
		<p ref='circular'></p>
		<p>{{item.text}}</p>
	</div>
	<div class='img-dotted' ref='dotted'></div>
</div> -->
    </div>

    <div class="rightindex">
    </div>
  </div>
</template>

<script>
export default {
  data(){

  },
  created(){

  },
  methods:{
    
 }
}
</script>

<style lang="less" scoped>
.main{
  width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 100vh;
  display: flex;
 justify-content: flex-start;
}
.leftindex {
  background-color: black;
  height: 100%;
  width: 200px;
  position: absolute;
  top: 0px;
  left: 0px;
  text-align: center;
}
.searchlabel input{
  width: 170px;
  height: 25px;
  background-image: url(../assets/search.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 150px 2px;
  font-size: 13px; 
}
.searchlabel img{
  float:right; 
  margin-right: 26px;
}
.leftindex .touxiang {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 16px auto  0px;
}

.leftindex span {
  display: inline-block;
  color: honeydew;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-bottom: 15px;
}
.leftindex .name {
  margin-top: 12px;
  margin-bottom: 4px;
}
.leftindex-main ul li{
  color: aliceblue;
  margin-top: 25px;
  text-align: left;
  margin-left: 15px;
  height: 35px;
}
.leftindex-main img{
   width: 20px;
   height: 20px;
   margin-right: 15px;
   vertical-align: middle;
}
.leftindex .icon{
   position: absolute;
   bottom: 0px;
   margin-left: 8px;
}
.leftindex .icon img{
   width: 20px;
   height: 20px;
   float: left;
   margin-right: 8px;
   }
.leftindex .icon span{
  font-size: 10px;
}
.mainindex {
  display: flex;
  flex: 1;
}
</style>