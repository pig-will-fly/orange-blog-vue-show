<template>
  <aside class="owner margin-top10-md">
    <img src="../../assets/img/avatar-bg.png" alt="">
    <a href="" class="avatar"><img src="../../assets/img/avatar1.jpg" alt=""></a>
    <p class="name">过期的橘子</p>
    <ul class="overview">
      <li>
        <span v-text="overview.essayNum"></span>
        <p>文章</p>
      </li>
      <li>
        <span v-text="overview.viewsNum"></span>
        <p>阅读</p>
      </li>
      <li>
        <span v-text="overview.commentNum"></span>
        <p>评论</p>
      </li>
    </ul>
    <ul class="link-more clearfix">
      <li>
        <a href=""></a>
      </li>
      <li>
        <a href=""></a>
      </li>
      <li>
        <a href=""></a>
      </li>
      <li>
        <a href=""></a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "SideOwner",
  data() {
    return {
      overview: {
        commentNum: 0,
        essayNum: 0,
        viewsNum: 0
      }
    }
  },
  created() {
    this.getBlogOverview();
  },
  methods: {
    getBlogOverview() {
      this.$api.getBlogOverview().then((res) => {
        this.overview = res.data;
      });
    }
  }
}
</script>

<style lang="less" scoped>
.owner {
  width: 100%;
  background: @content-color;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 14px;
    margin: 0;

    &.name {
      font-size: 24px;
      padding: 25px 0 10px 0;
      text-align: center;
      color: @theme-color;
    }
  }

  > img {
    display: block;
    width: 100%;
    height: 140px;
  }

  .avatar {
    position: relative;
    display: block;
    height: 30px;
    transition: all .3s ease;

    > img {
      position: absolute;
      display: block;
      width: 80px;
      height: 80px;
      top: -40px;
      transform: translateX(-50%);
      left: 50%;
      border-radius: 50%;
      box-sizing: content-box;
      background-color: @content-color;
      border: 5px solid @content-color;
    }

    &:hover > img {
      box-shadow: 0 0 10px 2px @content-color;
    }
  }

  .overview {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0;

    li {
      position: relative;
      padding: 6px 0;
      color: @mark-color;
      width: 66px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      &:nth-child(-n+2)::after {
        content: "";
        position: absolute;
        height: 30px;
        width: 1px;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        background-color: @common-color-gray;
      }

      span {
        display: block;
        font-size: 18px;
        font-weight: 100;
      }
    }
  }

  .link-more {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-around;

    li {
      position: relative;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 50%;

      > a {
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid;
        border-radius: 50%;
        transition: all .3s ease;
      }

      &:nth-child(1) > a {
        background: url(../../assets/img/icons/home.png) no-repeat center center;
        background-size: 20px;
        border-color: #00C5FF;

        &:hover {
          box-shadow: 0 0 8px 2px #00C5FF;
        }
      }

      &:nth-child(2) > a {
        background: url(../../assets/img/icons/email.png) no-repeat center center;
        background-size: 20px;
        border-color: #FF8C00;

        &:hover {
          box-shadow: 0 0 8px 2px #FF8C00;
        }
      }

      &:nth-child(3) > a {
        background: url(../../assets/img/icons/qq.png) no-repeat center center;
        background-size: 20px;
        border-color: #1296db;

        &:hover {
          box-shadow: 0 0 8px 2px #1296db;
        }

      }

      &:nth-child(4) > a {
        background: url(../../assets/img/icons/wechat.png) no-repeat center center;
        background-size: 20px;
        border-color: #46BB36;
      }

      &:hover {
        box-shadow: 0 0 8px 2px #46BB36;
      }

    }
  }
}
</style>