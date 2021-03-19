<template>
  <a-carousel autoplay arrows>
    <img class="banner-height-md border-radius-md" src="../assets/img/banner/spring.png" alt="春"/>
    <img class="banner-height-md border-radius-md" src="../assets/img/banner/summer.png" alt="夏"/>
    <img class="banner-height-md border-radius-md" src="../assets/img/banner/autumn.png" alt="秋"/>
    <img class="banner-height-md border-radius-md" src="../assets/img/banner/winter.png" alt="冬"/>
    <div slot="prevArrow" class="arrow prev-arrow">
      <a-icon type="left"/>
    </div>
    <div slot="nextArrow" class="arrow next-arrow">
      <a-icon type="right"/>
    </div>
  </a-carousel>
</template>

<script>
export default {
  name: "BlogBanner"
}
</script>

<style lang="less" scoped>

.banner-height-md {
  height: 300px;
  width: 100%;
}

.slick-arrow.arrow {
  width: 40px;
  height: 40px;
  font-size: 28px;
  color: @white;
  background-color: @black;
  opacity: 0.3;
  border-radius: 50%;
  z-index: 1;
  display: flex !important;
  justify-content: center;
  align-items: center;

  &::before {
    display: none;
  }

  &.prev-arrow.slick-prev {
    left: 0;

    &:hover {
      opacity: .5;
      color: @white;
      background-color: @black;
    }
  }

  &.next-arrow.slick-next {
    right: 0;

    &:hover {
      opacity: .5;
      color: @white;
      background-color: @black;
    }
  }
}

</style>