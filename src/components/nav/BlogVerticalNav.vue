<template>
  <a-drawer
      placement="left"
      :closable="false"
      :visible="showNav"
      @close="closeNav"
  >
    <!--导航菜单-->
    <a-menu class="menu" mode="inline" theme="dark"
            :selectedKeys="[$route.path]" @click="closeNav">
      <a-menu-item key="/index">
        <router-link to="/index">主页</router-link>
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
  </a-drawer>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "BlogVerticalNav",
  computed: {
    ...mapState(["showNav"])
  },
  methods: {
    ...mapMutations(["SET_SHOW_NAV"]),
    closeNav() {
      this.SET_SHOW_NAV(false);
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  width: 100%;
  height: 100%;
}
</style>