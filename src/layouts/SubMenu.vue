<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.path" @click="add">
        <a-icon v-if="item.icon" :type="item.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"],
  methods: {
    add() {
      console.log("this.$router");
      console.log(this.$router);
      // this.$router.push({ path: item.path, query: this.$route.query });
    }
  }
};
</script>
