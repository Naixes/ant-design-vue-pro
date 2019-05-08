<script>
import { check } from "../utils/auth";
// 权限组件
export default {
  // 函数式组件：没有this
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  // 由于没有this，template传值不方便，使用render函数渲染页面
  render(h, context) {
    const { props, scopedSlots } = context;
    console.log(scopedSlots);
    // 通过权限校验时渲染作用域插槽
    // 注意：scopedSlots.default是一个方法
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>

<style></style>
