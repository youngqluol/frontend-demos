const Webpack = require('webpack');
const WebpackCofig = require('./webpack.config');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(WebpackCofig, {
  mode:'development', // 开发模式
  devtool:'cheap-module-eval-source-map',  // 此选项控制是否生成，以及如何生成 source map
  devServer: {    // webpack-dev-server 相关配置
    port: 8000,
    hot: true,
    open: true,  // 自动打开浏览器
    contentBase: '../dist'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()   // 热更新热部署
  ]
})