// 引入方式变为：
const {createProxyMiddleware } = require('http-proxy-middleware');

//《《《《——————————前期跨域配置，当出现跨域，修改对应IP地址即可————————————》》》》

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api',
      {
        target: 'http://115.28.139.125:8088',
        // target:'https://www.bilibili.com',
        changeOrigin: true
      }
    )
  )
};