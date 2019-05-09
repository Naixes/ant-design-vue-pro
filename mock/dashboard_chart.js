function chartData(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [10, 20, 30, 40, 50, 60];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chartData;
