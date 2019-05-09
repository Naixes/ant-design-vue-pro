<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
// 用于图表的重新渲染
import { addListener, removeListener } from "resize-detector";

export default {
  props: {
    options: {
      type: Object,
      // 注意这里是一个函数
      default: () => {}
    }
  },
  watch: {
    // watch监听改变重新渲染数据
    // 由于改变的数据在options的内部需要深度监听才能监听得到
    options(val) {
      this.chart.setOption(val);
    }
    // 对图表数据的深度监听
    // 缺点：耗费性能，可以选择手动修改的方式
    // options: {
    //   handler(val) {
    //     // console.log("watch options");
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  // 节流：指定时间内只允许一次操作
  created() {
    this.resize = debounce(this.resize, 300);
  },
  // 要操作DOM时需要写到mounted中
  mounted() {
    this.renderChart();
    // 监听容器大小改变，设置ele的回调resize
    // addListener(ele, cb)
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    // 移除监听事件
    removeListener(this.$refs.chartDom, this.resize);
    // 销毁图表
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // 改变图表尺寸，在容器大小发生改变时需要手动调用。resize(opts?)
    resize() {
      // console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.options);
    }
  }
};
</script>

<style></style>
