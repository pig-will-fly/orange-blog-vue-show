<template>
  <main class="inner width-md">
    <!--文章列表-->
    <blog-articles :article-type="type"></blog-articles>
    <!--侧边栏-->
    <blog-side class="hidden-md" :type="type"></blog-side>
  </main>
</template>

<script>
import BlogArticles from "@/components/main/BlogArticles";
import BlogSide from "@/components/main/BlogSide";
import {mapMutations, mapState} from "vuex";

export default {
  name: 'Main',
  components: {BlogSide, BlogArticles},
  data() {
    return {}
  },
  computed: {
    ...mapState(["accessTypes"]),
    type() {
      let type;
      this.accessTypes.some((item) => {
        if (item.type === this.$route.params.type) {
          type = item.code
          return true;
        }
      })
      return type;
    },
  },
  methods: {
    ...mapMutations(["SET_SIDES"]),
  },
  watch: {
    type: {
      handler(newVal) {
        return newVal === null ? this.SET_SIDES({
          owner: true,
          newest: true,
          hottest: true,
          cloud: true
        }) : this.SET_SIDES({
          owner: false,
          newest: false,
          hottest: false,
          cloud: false
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.inner {
  width: 1100px;
}
</style>