<template>
  <!-- 注意中间的逗号 -->
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- theme：主题 -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        :width="256"
      >
        <div class="logo">
          <h4 v-if="!collapsed" class="logo">Ant Design Pro</h4>
        </div>
        <!-- 菜单 -->
        <!-- 传递主题 -->
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <!-- 头部 -->
        <a-layout-header style="background: #fff; padding: 0">
          <!-- 注意引号 -->
          <a-icon
            v-auth="['admin', 'user']"
            class="menu"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <!-- 内容 -->
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <!-- 底部 -->
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 权限组件 -->
    <Authorized :authority="['admin', 'user']">
      <!-- 主题定制：抽屉 -->
      <Drawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import SiderMenu from "./SiderMenu";
import Footer from "./Footer";
import Drawer from "../components/SettingDrawer";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    // 主题定制
    navTheme() {
      // console.log("$route.query", this.$route.query);
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    Header,
    SiderMenu,
    Footer,
    Drawer
  }
};
</script>

<style scoped>
/* 写成.nav-theme-dark .logo可能会有问题：第三方组件会对最外层div添加自定义属性，scoped中的css编译出来选择器都会加上自定义属性 */
/* >>> 深度选择器：可影响子组件，sass/less的话可能无法识别，这时候需要使用 /deep/ 选择器 */
.nav-theme-dark >>> .logo {
  color: #fff;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.menu {
  padding: 0 20px;
  font-size: 20px;
  line-height: 64px;
}
.menu:hover {
  background-color: #eee;
}
</style>
