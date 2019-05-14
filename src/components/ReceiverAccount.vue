<template>
  <!-- 自定义表单控件： -->
  <!-- 自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定： -->
  <!-- 提供受控属性 value 或其它与 valuePropName-参数) 的值同名的属性。 -->
  <!-- 提供 onChange 事件或 trigger-参数) 的值同名的事件。 -->
  <!-- 不能是函数式组件。 -->
  <a-input-group compact>
    <a-select v-model="type" style="width: 100px" @change="handleChangeType">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <a-input
      v-model="number"
      style="width: 200px"
      placeholder="请输入收款账号"
      @change="handleChangeNum"
    />
  </a-input-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  //   watch: {
  //     value(val) {
  //       Object.assign(this, val);
  //     }
  //   },
  data() {
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  methods: {
    handleChangeType(val) {
      // 向form提供变化后的值
      // Should provide an event to pass value to Form.
      this.$emit("change", { ...this.value, type: val });
    },
    handleChangeNum(e) {
      this.$emit("change", { ...this.value, number: e.target.value });
    }
  }
};
</script>

<style></style>
