module.exports = {
  pages: {
    index: {
      entry: ["src/main.js"],
    },
  },
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    open: process.platform === "darwin",
    host: "0.0.0.0", // 允许外部ip访问
    port: 8022, // 端口
    https: false, // 启用https
    overlay: {
      warnings: false,
      errors: false,
    }, // 错误、警告在页面弹出
    proxy: {
      "/mock-api": {
        target: "http://www.baidu.com",
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          "^/mock-api": "", //标识，接口只要是'/mock-api'开头的才用代理,最后代理路径是 http://www.baidu.com/请求路径
        },
      },
      "/wechat": {
        target: "http://api.wuliuy.com/", //测试环境
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          "^/wechat": "", //标识，接口只要是'/mock-api'开头的才用代理,最后代理路径是 http://www.baidu.com/请求路径
        },
      },
    }, // 代理转发配置，用于调试环境
  },
};
