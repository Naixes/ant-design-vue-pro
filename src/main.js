import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 加载ant-design-vue
// 全局加载
// import Antd from "ant-design-vue"
// import "ant-design-vue/dist/antd.less"
// 按需加载
// import Button from "ant-design-vue/lib/button"
// import "ant-design-vue/lib/button/style"
// 配置了babel-plugin-import后可以使用
import { Button, Layout, Icon, Drawer, Radio } from "ant-design-vue";

Vue.config.productionTip = false;

// 注册ant-design-vue
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
