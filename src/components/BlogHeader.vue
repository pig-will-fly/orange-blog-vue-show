<template>
  <!--头部区域-->
  <header>
    <div class="inner width-md">
      <!--logo-->
      <img class="logo" src="../assets/img/logo.png" alt=""/>
      <!--导航菜单-->
      <a-menu mode="horizontal" class="nav hidden-md" theme="dark" :selectedKeys="[$route.path]">
        <a-menu-item key="/index">
          <router-link to="/">主页</router-link>
        </a-menu-item>
        <a-sub-menu key="/index/article">
          <span slot="title">
            <span>诗文随笔</span>
          </span>
          <a-menu-item key="/index/article/poetry">
            <router-link to="/index/article/poetry">诗语</router-link>
          </a-menu-item>
          <a-menu-item key="/index/article/poem">
            <router-link to="/index/article/poem">词话</router-link>
          </a-menu-item>
          <a-menu-item key="/index/article/essay">
            <router-link to="/index/article/essay">随笔</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="/index/skills">
          <span slot="title">
            <span>职业技能</span>
          </span>
          <a-menu-item key="/index/skills/java">
            <router-link to="/index/skills/java">Java</router-link>
          </a-menu-item>
          <a-menu-item key="/index/skills/mysql">
            <router-link to="/index/skills/mysql">MySQL</router-link>
          </a-menu-item>
          <a-menu-item key="/index/skills/linux">
            <router-link to="/index/skills/linux">Linux</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/index/comment">
          <router-link to="/index/comment">絮语</router-link>
        </a-menu-item>
        <a-menu-item key="/index/about">
          <router-link to="/index/about">关于我</router-link>
        </a-menu-item>
      </a-menu>
      <!--导航菜单隐藏图标-->
      <div class="nav-ico show-md" @click.stop="showVerticalNav">
        <a-icon type="menu"/>
      </div>
    </div>
    <!--侧边栏导航-->
    <blog-vertical-nav></blog-vertical-nav>
  </header>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import BlogVerticalNav from "@/components/nav/BlogVerticalNav";

export default {
  name: "BlogHeader",
  components: {
    BlogVerticalNav
  },
  computed: {
    ...mapState(["showNav"])
  },
  methods: {
    ...mapMutations(["SET_SHOW_NAV"]),
    showVerticalNav() {
      this.SET_SHOW_NAV(!this.showNav);
    }
  }
}
</script>

<style lang="less" scoped>
.inner {
  width: 1100px;
  height: 80px;
  display: flex;
  box-sizing: border-box;
  position: relative;

  .logo {
    height: 80px;
    width: 150px;
  }

  .nav {
    padding: 0 50px;
  }

  .nav-ico {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 34px;
    color: @header-font-color;
  }

}

// 覆写menu样式
[role="menuitem"] {
  height: 80px;
  line-height: 80px;
}

.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  color: @header-font-color !important;
  background: @header-color !important;
}

.ant-menu-dark .ant-menu-item:hover,
.ant-menu-dark .ant-menu-item-active,
.ant-menu-dark .ant-menu-submenu-active,
.ant-menu-dark .ant-menu-submenu-open,
.ant-menu-dark .ant-menu-submenu-selected,
.ant-menu-dark .ant-menu-submenu-title:hover {
  color: @header-font-color !important;
  background-color: @header-active-color;

  > a {
    color: @header-font-color !important;
  }
}
</style>