<template>
  <aside class="hottest">
    <h4 class="title">热门推荐</h4>
    <ul>
      <li v-for="(hottest, index) in hottests" :key="index">
        <a :href="'#/index/detail/' + hottest.id" v-text="hottest.title"></a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "SideHottest",
  props: {
    type: {
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      hottests: [],
    }
  },
  computed: {
    _type() {
      return this.type == null ? 0 : this.type;
    }
  },
  created() {
    this.getHottestBlogEssay();
  },
  methods: {
    getHottestBlogEssay() {
      this.$api.getHottestBlogEssay({
        limit: 6,
        type: this._type
      }).then((res) => {
        this.hottests = res.data
      })
    }
  },
  watch: {
    type() {
      this.getHottestBlogEssay();
    }
  }
}
</script>

<style lang="less" scoped>
.hottest {
  width: 100%;
  margin-top: 20px;
  background: @content-color;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    position: relative;
    font-size: 18px;
    padding-left: 20px;
    margin-bottom: 15px;
    height: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 15px;
      line-height: 15px;
      background: @theme-color;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-radius: 30px;
    }
  }

  ul {
    padding: 0;
    counter-reset: count;

    li {
      position: relative;
      line-height: 16px;
      padding: 6px 0;
      color: @mark-color;

      &:nth-child(even) {
        background: @body-color;
      }

      a {
        display: inline-block;
        padding-left: 10px;
        vertical-align: middle;
      }

      &::before {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        vertical-align: middle;
        font-size: 9px;
        color: @common-color-white;
        background-color: @common-color-gray;
        content: counter(count, decimal);
        counter-increment: count;
      }

      &:nth-child(-n+3)::before {
        background-color: @theme-color;
      }
    }
  }
}
</style>