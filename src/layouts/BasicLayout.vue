<template>
  <div :class="[`nav-theme-${navTheme}, nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout==='left'"
        :theme="navTheme" 
        :trigger="null"
        collapsible
        v-model="collapsed"
      >
        <div class="logo">Ant Design Pro</div>
        <!-- 菜单 -->
        <SiderMenu />
      </a-layout-sider>
      <a-layout>
        <!-- 头部 -->
        <a-layout-header style="background: #fff; padding: 0">
          <!-- 注意冒号 -->
          <a-icon class="menu" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="collapsed = !collapsed"></a-icon>
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
    <Drawer />
  </div>
</template>

<script>
import Header from "./Header"
import SiderMenu from "./SiderMenu"
import Footer from "./Footer"
import Drawer from "../components/SettingDrawer"
export default {
  components: {
    Header,
    SiderMenu,
    Footer,
    Drawer
  },
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    navTheme() {
      return this.$route.navTheme || "dark";
    },
    navLayout() {
      return this.$route.navLayout || "left";
    }
  },
  methods: {
    
  }
};
</script>

<style scoped>
.menu {
  padding: 0 20px;
  font-size: 20px;
  line-height: 64px;
}
.menu:hover {
  background-color: #eee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
}
/* >>> 深度选择器：可影响子组件 */
.nav-theme-dark >>> .logo {
  color: #fff;
}
</style>
