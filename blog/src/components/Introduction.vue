<template>
  <div id="me">
    <h1>关于本人</h1>
    <div class="line"></div>
    <nav>
      <li class="title">经历：</li>
      <li>2017年进入大学</li>
      <li>2019年初开始接触前端并开始初步的学习</li>
      <li>99年，大四，现居常州</li>
      <li class="title">因由：</li>
      <li>
        为什么要做一个属于自己的博客呢，这个想法在上大一的时候就有，博客主要是为了记录一些个人的想法。
      </li>
      <li>
        我是一个比较有想法的人，日常生活中想到的好点子，或者学习中遇到的问题都会有好的解决办法，分享给大家。
      </li>
      <li class="title">近期愿望：</li>
      <li>希望能找到一份适合的工作</li>
      
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@no:15;
#me {
 white-space: nowrap;
 display: inline-block;
  height: 380rem/@no;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 8rem/@no;
  box-shadow: 0 2rem/@no 10rem/@no 0 rgba(0, 0, 0, 0.12);
  padding: 20rem/@no 20rem/@no;
  box-sizing: border-box;
  color: #000;
  h1 {
    font-size: 30rem/@no;
  }
  .line {
    border: 1px solid #ddd;
    margin: 10rem/@no 0;
  }
  nav {
    li {
      margin: 10rem/@no 0;
    }
  }
  .title {
    font-size: 18rem/@no;
    font-weight: bold;
    color: darkcyan;
  }
}
</style>