<template>
  <div class="inner margin-top10-md width-md">
    <a-breadcrumb :routes="routes">
      <template slot="itemRender" slot-scope="{ route }">
        <a-icon :type="route.icon" v-if="route.icon"/>
        <router-link v-if="route.link" :to="route.path" v-text="route.breadcrumbName"></router-link>
        <span v-else v-text="route.breadcrumbName"></span>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BlogBreadcrumb",
  data() {
    return {
      allRoutes: [{
        path: "/index", breadcrumbName: "主页", icon: "home", link: true
      }, {
        path: "/index/comment", breadcrumbName: "絮语", link: true
      }, {
        path: "/index/about", breadcrumbName: "关于我", link: true
      }, {
        path: "/index/detail", breadcrumbName: "文章详情"
      }, {
        path: "/index/article", breadcrumbName: "诗词随笔"
      }, {
        path: "/index/skills", breadcrumbName: "职业技能"
      }]
    };
  },
  computed: {
    ...mapState(["accessTypes"]),
    type() {
      let type;
      this.accessTypes.some((item) => {
        if (item.type === this.$route.params.type) {
          type = item.text
          return true;
        }
      })
      return type;
    },
    routes() {
      let routes = [];
      let route;
      this.allRoutes.forEach((item) => {
        if (this.$route.path.includes(item.path)) {
          routes.push(item);
          if (this.$route.params.type && this.type) {
            if (!routes.some((item) => {
              return item.path === this.$route.path;
            }))
              route = {
                path: this.$route.path, breadcrumbName: this.type
              }
          }
        }
      })
      if (route)
        routes.push(route);
      return routes;
    }
  }
}
</script>

<style lang="less" scoped>
.inner {
  width: 1100px;
  padding-left: 30px;
}
</style>