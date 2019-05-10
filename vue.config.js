// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true
      }
    }
  },
  // webpack提供的服务
  devServer: {
    // 代理
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
            // 判断是否使用mock数据
            // "serve:no-mock": "cross-env MOCK=none vue-cli-service serve"
            // serve:no-mock命令表示不使用mock数据，Windows需要依赖cross-env包
          } else if (process.env.MOCK !== "none") {
            // 从url获取文件名
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            // 删除缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
