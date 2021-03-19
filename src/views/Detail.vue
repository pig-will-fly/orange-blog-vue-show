<template>
  <main class="inner width-md">
    <div class="detail width-md border-radius-md margin-top10-md">
      <!--标题-->
      <div class="title margin-top10-md">
        <h2 v-text="article.current.title"></h2>
        <div class="actions width-md">
            <span :key="type" v-for="{type,text,hidden} in actions" :class="hidden?'hidden-sm':''">
              <a-icon :type="type"/>
              {{ text }}
            </span>
        </div>
      </div>
      <!--内容详情-->
      <article class="content">
        <mavon-editor :subfield=false :toolbars-flag=false :editable=false :ishljs=true
                      :external-link="externalLink" :value="article.current.content"
                      code-style="tomorrow-night-blue" default-open="preview" class="markdown-body">
        </mavon-editor>
      </article>
      <!--快捷导航-->
      <div class="next">
        <p v-if="article.pre">
          上一篇：
          <a :href="'#/index/detail/'+article.pre.id" v-text="article.pre.title"></a>
        </p>
        <p v-if="article.next">
          下一篇：
          <a :href="'#/index/detail/'+article.next.id" v-text="article.next.title"></a>
        </p>
      </div>
      <!--评论列表-->
      <div class="reply-list" v-if="comments.length > 0">
        <h2>评论列表：</h2>
        <comment-list :list="comments"></comment-list>
      </div>
      <!--评论框-->
      <div class="reply-box">
        <h2>发表评论：</h2>
        <reply-box type="2" :essay-id="article.current.id" @refreshList="refreshList"></reply-box>
      </div>
    </div>
    <!--侧边栏-->
    <blog-side class="hidden-md blog-side" :type="article.current.type"></blog-side>
  </main>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import BlogSide from "@/components/main/BlogSide";
import {mapMutations} from "vuex";
import ReplyBox from "@/components/comment/ReplyBox";
import CommentList from "@/components/comment/CommentList";

export default {
  name: "Detail",
  components: {CommentList, ReplyBox, mavonEditor, BlogSide},
  props: ['id'],
  data() {
    return {
      sides: {
        owner: false,
        newest: true,
        hottest: true,
        cloud: false
      },
      article: {
        current: {
          review: null,
          updateTime: "",
          id: null,
          title: "",
          type: null,
          content: "",
          views: null
        },
        pre: {
          id: null,
          title: "",
          type: null
        },
        next: {
          id: null,
          title: "",
          type: null
        },
      },
      comments: [],
      externalLink: {
        katex_css: false,
        katex_js: false,
        markdown_css: false,
        hljs_js: function () {
          return 'highlight/highlight.min.js';
        },
        hljs_css: function (css) {
          return 'highlight/styles/' + css + '.min.css';
        },
        hljs_lang: function (lang) {
          return 'highlight/languages/' + lang + '.min.js';
        },
      },
      toolbars: {
        toolbarsFlag: false,
        subfield: false,
        defaultOpen: "preview"
      }
    }
  },
  computed: {
    actions() {
      return [
        {type: "user", text: String(this.article.current.publisher)},
        {type: "clock-circle", text: this.article.current.updateTime},
        {type: "eye", text: String(this.article.current.views)},
        {type: "message", text: String(this.article.current.review), hidden: true},
      ]
    }
  },
  created() {
    this.getArticleDetail();
    this.getCommentListPage({
      type: 2,
      essayId: this.id
    });
    this.SET_SIDES(this.sides);
  },
  methods: {
    ...mapMutations(["SET_SIDES"]),
    getArticleDetail() {
      this.$api.getEssayDetail({id: this.id}).then((res) => {
        this.article = res.data;
      })
    },
    getCommentListPage(params) {
      this.$api.getCommentListPage(params).then((res) => {
        if (res.data) {
          this.comments = res.data.records;
        }
      })
    },
    updateEssayView(id) {
      this.$api.updateEssayView({id}).then(() => {
        this.article.current.views += 1;
      })
    },
    refreshList() {
      this.getCommentListPage({
        type: 2,
        essayId: this.id
      });
      this.article.current.review += 1;
    }
  },
  watch: {
    id: function () {
      this.getArticleDetail();
      this.getCommentListPage({
        type: 2,
        essayId: this.id
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.updateEssayView(to.params.id)
    next()
  },
  beforeRouteEnter(to, from, next) {
    from.name !== null ? next(vm => {
      vm.updateEssayView(to.params.id);
    }) : next();
  }
}
</script>

<style lang="less" scoped>

.inner {
  width: 1100px;

  .detail {
    width: 760px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: @content-color;
    padding: 20px;
    margin-bottom: 10px;

    .title {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      border-bottom: .5px solid @border-color;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 20px;
        color: @theme-color;
        padding-top: 10px;
      }

      .actions {
        display: flex;
        justify-content: space-around;
        width: 500px;

        span {
          font-size: 14px;
          color: @mark-color;
        }
      }
    }

    .content > .markdown-body {
      background-color: @content-color !important;
      box-shadow: none !important;
      z-index: 1 !important;
    }

  }

  .next {
    padding: 0 20px;
  }

  .reply-list, .reply-box {
    padding: 20px;

    h2 {
      box-sizing: border-box;
      font-size: 18px;
      color: @theme-color;
      position: relative;
      padding-left: 10px;

      &::before {
        position: absolute;
        content: "";
        width: 4px;
        height: 20px;
        background: @theme-color;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        border-radius: 30px;
      }
    }
  }

  .blog-side {
    margin-top: 0;
  }
}


</style>