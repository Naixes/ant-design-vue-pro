function chartData(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [40, 20, 30, 20, 50, 60];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chartData;
