<template>
  <div>
    <!-- 这里的style会直接挂载到子元素的根节点 -->
    <Chart :options="chartOptions" style="height:400px" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import random from "lodash/random";

// 指定图表的配置项和数据
const chartOptions = {
  title: {
    text: "ECharts"
  },
  tooltip: {},
  legend: {
    data: ["销量"]
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};
export default {
  data() {
    return {
      chartOptions
    };
  },
  created() {
    setInterval(() => {
      // 数据改变后图表没有同步改变，需要watch监听改变重新渲染数据
      // 注意map返回新数组需要接收
      chartOptions.series[0].data = chartOptions.series[0].data.map(() =>
        random(100)
      );
      // console.log(chartOptions.series[0].data);
      // 由于深度监视耗费性能，在这里手动修改chartOptions的值
      this.chartOptions = { ...this.chartOptions };
    }, 1000);
  },
  components: {
    Chart
  }
};
</script>

<style></style>
