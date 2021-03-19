<template>
  <div class="aside">
    <!--总览-->
    <side-owner v-if="sides.owner"></side-owner>
    <!--最新发布-->
    <side-newest v-if="sides.newest" :type="type"></side-newest>
    <!--热门文章-->
    <side-hottest v-if="sides.hottest" :type="type"></side-hottest>
    <!--标题云-->
    <side-cloud v-if="sides.cloud"></side-cloud>
  </div>
</template>

<script>
import SideOwner from "@/components/sides/SideOwner";
import SideNewest from "@/components/sides/SideNewest";
import SideHottest from "@/components/sides/SideHottest";
import SideCloud from "@/components/sides/SideCloud";
import {mapState} from "vuex";

export default {
  name: "BlogSide",
  components: {SideCloud, SideHottest, SideNewest, SideOwner},
  props: ['type'],
  computed: {
    ...mapState(["sides"]),
  }
}
</script>

<style lang="less" scoped>
.aside {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 10px;
}
</style>