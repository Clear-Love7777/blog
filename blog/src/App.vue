<template>
  <div id="app">
      <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>


<script>
import CanvasNest from "canvas-nest.js"

const config = {
  color: "0, 255, 255", // 线条颜色.
  pointColor: "255, 0, 255", // 节点颜色
  opacity: 1, // 线条透明度
  count: 200, // 线条数量
  zIndex: 99 // 画面层级1
};
const cn = new CanvasNest(document.getElementById("app"), config);
// destroy
cn.destroy();
export default {
   name: 'app',

created(){
 this.$nextTick(() => {
      const cn = new CanvasNest(document.getElementById("app"), config);
    });
}
}
</script>


<style >
#app{
  position: relative;
  z-index: 999;
}
</style>