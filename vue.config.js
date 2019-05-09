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
        // 要写上http://
        target: "http://localhost:3000",
        bypass: function(req, res) {
          // console.log(req.headers);
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
            // none是字符串
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
