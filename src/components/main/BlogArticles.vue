<template>
  <section class="content width-md">
    <!--banner区域-->
    <blog-banner class="banner border-radius-md margin-top10-md" v-if="articleType==null"></blog-banner>
    <!--文章列表-->
    <div class="articles border-radius-md margin-top10-md" v-if="articles.length!==0">
      <a-list item-layout="vertical" size="large" :data-source="articles">
        <a-list-item class="article" slot="renderItem" key="item.title" slot-scope="item">
          <a-skeleton :loading="loading" active>
            <a-list-item-meta :description="item.description">
              <a slot="title" :href="'#/index/detail/'+item.id">{{ item.title }}</a>
            </a-list-item-meta>
            {{ item.summary }}
          </a-skeleton>
          <template v-for="{type,text} in item.actions" slot="actions">
            <span :key="type">
              <a-icon :type="type"/>
              {{ text }}
            </span>
          </template>
          <img slot="extra" alt="article-image" :src="item.image" v-if="item.image"/>
        </a-list-item>
      </a-list>
    </div>
    <!--分页-->
    <a-pagination
        v-model="query.currentPage"
        :page-size-options="pageSizeOptions"
        :total="Number(total)"
        show-size-changer
        :page-size="query.limit"
        @showSizeChange="onShowSizeChange"
        @change="changePage"
        :hideOnSinglePage="true"
        class="pagination"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
    <a-empty v-if="articles.length === 0" description="暂无数据" class="empty width-md"></a-empty>
  </section>
</template>

<script>

import BlogBanner from "@/components/BlogBanner";
import {mapMutations} from "vuex";

export default {
  name: "BlogArticles",
  components: {BlogBanner},
  props: {
    articleType: {
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      articles: [],
      actions: [],
      loading: true,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      query: {
        type: this.articleType,
        currentPage: 1,
        limit: 10
      },
      total: null,
    };
  },
  created() {
    this.getArticleList(this.query);
  },
  methods: {
    ...mapMutations(["SET_SIDES"]),
    onShowSizeChange(current, pageSize) {
      this.query.limit = pageSize;
      this.query.currentPage = 1;
      this.getArticleList(this.query);
    },
    changePage(current, size) {
      this.query.limit = size;
      this.query.currentPage = current;
      this.getArticleList(this.query);
    },
    getArticleList(params) {
      this.$api.getEssayListPage(params).then((res) => {
        if (res.data) {
          this.articles = res.data.records;
          this.total = res.data.total;
          this.articles.forEach((item) => {
            item.actions = [
              {type: "message", text: String(item.review)},
              {type: "eye", text: String(item.views)},
              {type: "clock-circle", text: item.updateTime}
            ];
          })
          this.loading = false;
        }
      })
    },
  },
  watch: {
    articleType(val) {
      this.query.type = val || null;
      this.getArticleList(this.query);
    },
    articles: {
      handler(newVal) {
        return newVal && newVal.length > 0 ? this.query.type === null ? this.SET_SIDES({
          owner: true,
          newest: true,
          hottest: true,
          cloud: true
        }) : this.SET_SIDES({
          owner: false,
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
.content {
  width: 760px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 20px;

  .banner {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .articles {
    background-color: @content-color;
    padding: 20px;

    .article {
      img {
        cursor: pointer;
        width: auto;
        height: 152px;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.5);
        }
      }

    }
  }

  .pagination {
    margin: 10px 0;
  }

  .empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;

    &.width-md {
      width: 1100px;
    }
  }
}
</style>