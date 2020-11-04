<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>


<script>
import CanvasNest from "canvas-nest.js";

const config = {
  color: "0, 255, 255", // 线条颜色.
  pointColor: "255, 0, 255", // 节点颜色
  opacity: 1, // 线条透明度
  count: 150, // 线条数量
  zIndex: 99, // 画面层级1
};
const cn = new CanvasNest(document.getElementById("app"), config);
// destroy
cn.destroy();

export default {
  name: "app",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  created() {
    this.$nextTick(() => {
      const cn = new CanvasNest(document.getElementById("app"), config);
    });
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭
      this.$nextTick(() => {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>


<style >
#app {
  position: relative;
  z-index: 999;
}
</style>