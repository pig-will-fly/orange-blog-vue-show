<template>
  <a-list class="comment-list" :data-source="list" v-if="list.length>0">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-comment :author="item.name">
        <a-avatar slot="avatar" alt="" :src="item.avatar">
          <a-icon slot="icon" type="user"/>
        </a-avatar>
        <template slot="actions">
          <span v-for="action in item.actions" :key="action">{{ action }}</span>
        </template>
        <p slot="content">
          {{ item.content }}
        </p>
        <a-tooltip slot="datetime" :title="item.updateTime">
          <span>{{ moment().to(item.updateTime) }}</span>
        </a-tooltip>
        <comment-list :list="item.children" v-if="item.children"></comment-list>
      </a-comment>
    </a-list-item>
  </a-list>
</template>

<script>
import moment from 'moment';

export default {
  name: "CommentList",
  components: {},
  props: ["list"],
  data() {
    return {
      moment,
    };
  }
}
</script>

<style lang="less" scoped>

</style>