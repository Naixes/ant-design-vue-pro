import { check } from "../utils/auth";
// 权限指令：缺点不够灵活，如果权限是动态的就不好使用，优点是使用方便
// Vue插件
// Vue.use(plugin)：安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。该方法需要在调用 new Vue() 之前被调用。
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    // 指令的周期函数：被绑定的元素插入父节点时调用，保证父节点存在但不一定已经插入文档
    // 钩子函数的参数： el、binding、vnode 和 oldVnode
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

// 默认导出必须是对象，导出方法是export function xxx(){}
export default { install };
