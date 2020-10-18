<template>
    <div id="blog">
    <!-- 头部导航 -->
    <header>
      <section>
        <a href="javascript:void(0);">
          <img src="..\assets\logo.jpg" alt="" />
          <span>June</span>
        </a>
        <nav>
          <li>
            <router-link to="/articles" @click.native="reload"
              ><i class="el-icon-s-home"></i>主页</router-link
            >
          </li>
          <li>
            <router-link to="/daily"
              ><i class="el-icon-s-order"></i>
              日常</router-link
            >
          </li>
        </nav>
      </section>
    </header>
    <main>

    </main>

    <!-- 底部区域 -->
    <footer>
      <section>
        <p>Copyright © 2020 - 2021 Designed by June</p>
      </section>
    </footer>
    </div>
</template>



<script>
export default {
    
}
</script>



<style lang="less" scoped>
#blog {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f8f9;
  position: relative;
  > header {
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  > footer {
    width: 440px;
    box-sizing: border-box;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
#blog > header {
  section {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    a {
      display: flex;
      align-items: center;
      margin-right: 1vw;
      &:hover span {
        color: #1e90ff;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
      span {
        color: #000;
        font-size: 20px;
        transition: color 0.25s;
      }
    }
  }
  nav {
    display: flex;
    list-style: none;
    line-height: 60px;
    li {
      a {
        color: #000;
        transition: color 0.5s;
        &:hover {
          color: #1e90ff !important;
        }
        font-size: 15px;
        > i {
          margin-right: 2px;
        }
      }
    }
  }
}
</style>