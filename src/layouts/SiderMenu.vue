<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <!-- 不包含子菜单的菜单部分 -->
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon type="pie-chart" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <!-- 包含子菜单的菜单部分 -->
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from "./SubMenu";
export default {
  components: {
    "sub-menu": SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    // 菜单数据
    // console.log(this.$router.options.routes);
    const menuData = this.getMenuData(this.$router.options.routes);
    // console.log(menuData);
    return {
      collapsed: false,
      menuData
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 从路由中获取菜单信息
    getMenuData(routes) {
      const menuData = [];
      // for-in：循环对象；for-of：循环数组
      for (let i of routes) {
        // 过滤有名字并且要展示的路由信息
        if (i.name && !i.hideInMenu) {
          // 拷贝当前路由信息进行编辑
          const item = { ...i };
          delete item.children;
          // 过滤有子元素并且不隐藏的路由信息
          if (i.children && !i.hideChildrenInMenu) {
            item.children = this.getMenuData(i.children);
          }
          // console.log(item);
          menuData.push(item);
          // 过滤没有名字并且要展示，有子元素并且不隐藏的路由信息
        } else if (i.children && !i.hideChildrenInMenu && !i.hideInMenu) {
          // 将返回的数组展开并添加到菜单数据中
          menuData.push(...this.getMenuData(i.children));
        }
      }
      return menuData;
    }
  }
};
</script>
