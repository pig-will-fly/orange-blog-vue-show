<template>
  <main class="width-md">
    <!--相片-->
    <div class="pic hidden-sm margin-top10-md">
      <img class="big" src="../assets/img/about-me.jpg" alt=""/>
      <img class="small" src="../assets/img/emoji/dance.gif" alt=""/>
    </div>
    <!--简介-->
    <article class="margin-top10-md">
      <h2>关于我</h2>
      <p>橘子，蜀北人士。幼顽劣，寡学术，常混迹于电玩之所，嬉闹于塘坳之中。其母愠其所为，笞之，未果，顽如故。</p>
      <p>及弱冠，入大学，性腼腆，寡朋友。沉迷于虚拟世界终日，荒于学，学科未过者颇多。幸甚，终获学历之凭证。</p>
      <p>又经年，幡然悔悟，立大志，然意犹未专，朝秦而暮楚，年近而立，业未有成，疲于口体之奉耳。</p>
      <p>呜呼！终是空负凌云志，枉为男儿大丈夫。</p>
      <label class="hidden-sm">ps：没错，图片是本人。hiahia...</label>
      <img class="hidden-sm" src="../assets/img/emoji/show-off.gif" alt="">
    </article>
  </main>
</template>

<script>
export default {
  name: 'About',
  components: {},
  data() {
    return {}
  }

}
</script>

<style lang="less" scoped>

.width-md {
  width: 1100px;
  display: flex;
  justify-content: space-between;

  .pic {
    padding: 0 0 20px 0;
    height: 420px;
    width: 580px;
    position: relative;

    .big {
      width: 100%;
      height: 100%;
      background-size: cover;
      border-radius: 5px;
    }

    .small {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 140px;
      height: 140px;
      background-size: cover;
      border-radius: 5px;
    }
  }

  article {
    padding: 0 20px 20px 20px;
    width: 390px;
    position: relative;

    > p {
      text-align: initial;
      text-indent: 2em;
      line-height: 2;
      margin: 0;
      padding-bottom: 10px;
    }

    > h2 {
      display: inline-block;
      font-size: 24px;
      color: #10afa0;
      margin: 0;
      padding-bottom: 30px;
    }

    > label {
      display: inline-block;
      text-indent: 2em;
      padding: 20px 30px 10px 0;
    }

    > img {
      display: inline-block;
      height: 100px;
      width: 100px;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}

</style>