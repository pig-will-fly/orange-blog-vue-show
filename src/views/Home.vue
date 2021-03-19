<template>
  <div class="container">
    <!--头部区域-->
    <blog-header class="header"></blog-header>
    <!--主体区域-->
    <div class="main-area">
      <blog-breadcrumb class="breadcrumb"></blog-breadcrumb>
      <router-view class="main"></router-view>
    </div>
    <!--尾部区域-->
    <blog-footer class="footer"></blog-footer>
  </div>
</template>

<script>

import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import BlogBreadcrumb from "@/components/nav/BlogBreadcrumb";

export default {
  name: 'Home',
  components: {
    BlogBreadcrumb,
    BlogFooter,
    BlogHeader
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    height: 80px;
    background-color: @header-color;
    display: flex;
    justify-content: center;
  }

  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;

    .breadcrumb {
      display: flex;
      align-self: center;
    }

    .main {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-self: center;
    }
  }

  .footer {
    height: 100px;
    background-color: @footer-color;
    color: @common-color-white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
