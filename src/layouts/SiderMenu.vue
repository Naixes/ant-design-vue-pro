<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <!-- 不包含子菜单的菜单部分 -->
        <a-menu-item
          @click="() => $router.push({ path: item.path, query: $route.query })"
          v-if="!item.children"
          :key="item.path"
        >
          <a-icon
            @click="push()"
            v-if="item.meta.icon"
            :type="item.meta.icon"
          />
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

import { checkCurrentAuthority } from "../utils/auth";

export default {
  // 主题
  props: {
    // 主题
    theme: {
      type: String,
      default: "dark"
    }
  },
  // 子菜单
  components: {
    "sub-menu": SubMenu
  },
  // 监视路由变化
  watch: {
    // 监视路由变化
    "$route.path": function(v) {
      // 绑定选中菜单
      this.selectedKeys = this.selectedKeysMap[v];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[v];
    }
  },
  data() {
    // 先定义变量！！！

    // 定义只在script中使用的数据
    // 选中菜单映射
    // 由于不是所有的路由都显示在菜单，不显示的路由需要映射一个菜单项
    this.selectedKeysMap = {};
    this.openKeysMap = {};

    // 定义只在data中使用的数据
    // 菜单数据
    // console.log(this.$router.options.routes);
    const menuData = this.getMenuData(this.$router.options.routes);
    // console.log(menuData);

    return {
      collapsed: false,
      menuData,
      // 将选中菜单和展开菜单绑定到路由
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    // 从路由中获取菜单信息
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      // for-in：循环对象；for-of：循环数组
      for (let i of routes) {
        // 根据权限显示菜单
        if (
          i.meta &&
          i.meta.authority &&
          !checkCurrentAuthority(i.meta.authority)
        ) {
          // 没有权限时进行下一次循环
          continue;
        }

        if (i.name && !i.hideInMenu) {
          // 过滤：有名字并且不需要隐藏
          // 设置菜单映射
          this.openKeysMap[i.path] = parentKeys;
          this.selectedKeysMap[i.path] = [selectedKey || i.path];
          // 拷贝当前路由信息进行编辑
          const item = { ...i };
          delete item.children;
          // 过滤：有子元素要展示
          if (i.children && !i.hideChildrenInMenu) {
            // 添加子元素
            item.children = this.getMenuData(i.children, [
              ...parentKeys,
              i.path
            ]);
            // 子元素不展示时只需要添加映射
          } else {
            this.getMenuData(
              i.children,
              selectedKey ? parentKeys : [...parentKeys, i.path],
              selectedKey || i.path
            );
          }
          // 添加到菜单
          menuData.push(item);
          // 过滤：没有名字但需要展示子元素
        } else if (!i.hideInMenu && !i.hideChildrenInMenu && i.children) {
          // 将返回的数组展开并添加到菜单数据中
          // 传递parentKeys的值
          menuData.push(
            ...this.getMenuData(i.children, [...parentKeys, i.path])
          );
        }
      }
      // console.log("openKeysMap", this.openKeysMap);
      // console.log("selectedKeysMap", this.selectedKeysMap);
      return menuData;
    }
  }
};
</script>
