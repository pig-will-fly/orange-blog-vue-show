<template>
  <main class="width-md">
    <div class="margin-top10-md comments">
      <!--留言框-->
      <reply-box class="reply-box border-radius-md" @refreshList="refreshList"></reply-box>
      <!--留言列表-->
      <div class="comment-list border-radius-md margin-top10-md">
        <h2>他们说</h2>
        <comment-list :list="comments"></comment-list>
        <!--空数据-->
        <a-empty v-if="comments.length === 0" description="暂无数据" class="empty width-md"></a-empty>
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
    </div>
    <!--公告-->
    <div class="margin-top10-md border-radius-md notice hidden-md">
      <h2>公告</h2>
      <ul>
        <li>社会主义核心价值观：</li>
        <li>富强、民主、文明、和谐、自由、平等、公正、法治、爱国、敬业、诚信、友善</li>
        <li>不忘初心，牢记使命。</li>
        <li>创建积极、文明、健康、友好、和谐互动环境</li>
      </ul>
    </div>
  </main>
</template>

<script>
import CommentList from "@/components/comment/CommentList";
import ReplyBox from "@/components/comment/ReplyBox";

export default {
  name: "Comment",
  components: {ReplyBox, CommentList},
  data() {
    return {
      comment: {
        content: "",
        name: "",
        email: "",
        type: 1
      },
      comments: [],
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      query: {
        type: 1,
        currentPage: 1,
        limit: 10
      },
      total: null,
    }
  },
  created() {
    this.getCommentListPage(this.query);
  },
  methods: {
    getCommentListPage(params) {
      this.$api.getCommentListPage(params).then((res) => {
        if (res.data) {
          this.comments = res.data.records;
          this.total = res.data.total;
        }
      })
    },
    refreshList() {
      this.getCommentListPage(this.query);
    },
    onShowSizeChange(current, pageSize) {
      this.query.limit = pageSize;
      this.query.currentPage = 1;
      this.getCommentListPage(this.query);
    },
    changePage(current, size) {
      this.query.limit = size;
      this.query.currentPage = current;
      this.getCommentListPage(this.query);
    },
  }
}
</script>

<style lang="less" scoped>
.width-md {
  width: 1100px;
  display: flex;
  justify-content: space-between;

  .comments {
    width: 760px;
    display: flex;
    flex-direction: column;
    justify-content: start;

    .reply-box {
      background-color: @content-color;
      padding: 20px;
    }

    > .comment-list {
      background-color: @content-color;
      padding: 20px;

      .empty {
        flex: 1;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
      }
    }

  }

  .notice {
    width: 300px;
    height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: @content-color;
    padding: 20px;

    ul {
      padding: 0;

      li {
        line-height: 2;
      }
    }
  }

  .pagination {
    margin: 10px 0;
  }
}

h2 {
  font-size: 20px;
  color: @theme-color;
  position: relative;
  padding: 0 20px;
  margin: 0;
}

h2::before {
  position: absolute;
  content: "";
  width: 4px;
  height: 20px;
  line-height: 20px;
  background: @theme-color;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  border-radius: 30px;
}
</style>