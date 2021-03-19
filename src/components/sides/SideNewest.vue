<template>
  <aside class="newest margin-top10-md">
    <h4 class="title">最近更新</h4>
    <ul>
      <li v-for="(newest,index) in newests" :key="index">
        <a :class="newest.id === id?'active':''" @click.prevent="showMore(newest.id)" v-text="newest.title"></a>
        <span v-text="newest.updateTime"></span>
        <transition name="show-more">
          <p class="detail" v-show="newest.id === id">
            {{ newest.summary|cutStr }}
            <br v-if="newest.summary.length < 19"/>
            <a :href="newest.id|setHref">[查看详情]</a>
          </p>
        </transition>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "SideNewest",
  props: {
    type: {
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      newests: [],
      id: null
    }
  },
  filters: {
    setHref: function (value) {
      return `#/index/detail/${value}`;
    },
    cutStr: (value) => {
      return value.length > 29 ? `${value.substring(0, 29)}...` : value;
    }
  },
  computed: {
    _type() {
      return this.type == null ? 0 : this.type;
    }
  },
  created() {
    this.getNewestBlogEssay();
  },
  methods: {
    getNewestBlogEssay() {
      this.$api.getNewestBlogEssay({
        limit: 6,
        type: this._type
      }).then((res) => {
        this.newests = res.data
      })
    },
    showMore(id) {
      this.id = this.id === id ? null : this.id = id
    }
  },
  watch: {
    type() {
      this.getNewestBlogEssay();
    }
  }
}
</script>

<style lang="less" scoped>
.newest {
  width: 100%;
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

    li {
      position: relative;
      line-height: 16px;
      padding: 6px 0;
      color: @mark-color;

      a {
        display: block;
        text-align: left;
        padding-left: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        &::before,
        &::after {
          display: block;
          content: "";
          position: absolute;
          border: 1px solid @theme-color;
          border-radius: 50%;
          background: #f5f5f7;
        }

        &::before {
          width: 7px;
          height: 7px;
          left: -2px;
          top: 10px;
          background: @common-color-white;
          opacity: .6;
        }

        &::after {
          width: 13px;
          height: 13px;
          left: -5px;
          top: 7px;
          background: @theme-color;
          opacity: .2;
          display: none;
        }

        &:hover::after,
        &.active::after {
          display: block;
          color: @theme-color;
        }
      }

      &::before {
        content: "";
        width: 3px;
        height: 100%;
        position: absolute;
        top: 10px;
        left: 0;
        background: @body-color;
      }

      &:last-child::before {
        background: transparent;
      }

      span {
        font-size: 12px;
        padding-left: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .detail {
        font-size: 12px;
        padding: 0 20px;
        margin-bottom: 0;
        overflow: hidden;
        box-sizing: content-box;

        a {
          display: inline;
          padding: 0;
          color: @mark-color;

          &:hover {
            color: @theme-color;
          }
        }
      }
    }
  }
}

.show-more-enter-active {
  height: 0;
}

.show-more-leave-active {
  height: 32px;
}

.show-more-enter-to {
  animation: enter-to .5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

.show-more-leave-to {
  animation: leave-to .5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes enter-to {
  from {
    height: 0;
  }
  to {
    height: 32px;
  }
}

@keyframes leave-to {
  from {
    height: 32px;
  }
  to {
    height: 0;
  }
}
</style>