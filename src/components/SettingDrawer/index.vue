<template>
  <div>
    <!-- 标题：title="Basic Drawer" -->
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <!-- 控制抽屉的插槽 -->
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格定制</h2>
        <!-- 将配置信息同步到路由上 -->
        <a-radio-group
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left">左侧</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },
    // 将配置信息同步到路由上
    handleSettingChange(type, value) {
      // 这里有问题
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
      console.log(this.$route.query)
    }
  }
}
</script>
<style scoped>
.handle {
  position: absolute;
  top: 280px;
  left: -45px;
  background-color: #1890ff;
  height: 45px;
  font-size: 20px;
  width: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  border-radius: 5px 0 0 5px;  
}
</style>

