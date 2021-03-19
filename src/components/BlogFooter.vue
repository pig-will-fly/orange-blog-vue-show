<template>
  <footer>
    <p>Copyright © 2021- 过期的橘子</p>
  </footer>
</template>

<script>
export default {
  name: "BlogFooter"
}
</script>

<style lang="less" scoped>
footer {
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  p {
    margin: 0;
    padding: 0;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>