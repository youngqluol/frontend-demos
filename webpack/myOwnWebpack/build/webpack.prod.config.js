const WebpackCofig = require('./webpack.config');
const WebpackMerge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');
const env = process.env.NODE_ENV === 'production';

let prodWebpackConfig = WebpackMerge(WebpackCofig, {
  mode:'production', // 开发模式
  devtool:'cheap-module-source-map', 
  optimization: {    // 自定义js优化配置，将会覆盖默认配置
      minimizer: [ // 压缩
        new UglifyJsPlugin({  // 压缩js
          exclude: /\.min\.js$/,  // 一般这种文件后缀是压缩过的
          cache: true,
          parallel: true,  // 开启并行压缩
          sourceMap: true, // Must be set to true if using source-maps in production
          extractComments: false,  // 移除注释
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              drop_console: env ? true : false
            }
          }
        }),
        new OptimizeCssAssetsPlugin({ // 优化css文件
          assetNameRegExp: /\.css$/g,
          cssProcessorOptions: {
            safe: true,
            autoprefixer: {
              disable: true
            },
            mergeLonghang: false,
            discardComments: {
              removeAll: true  // 移除注释
            }
          }
        })  
      ],
      splitChunks: {  // 分离代码：webpack4移除了CommonsChunkPlugin插件，取而代之的是splitChunks。
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            minSize: 30000,
            minChunks: 1,
            chunks: 'initial',
            priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
          },
          commons: {
            test: /[\\/]src[\\/]common[\\/]/,
            name: 'commons',
            minSize: 30000,
            minChunks: 3,
            chunks: 'initial',
            priority: -1,
            reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
          }
        }
      }
  },
  plugins: [
  ]
});
const startDate = new Date();
const spinner = ora('building for production...');
spinner.start();

Webpack(prodWebpackConfig, (err, stats) => {
  spinner.stop();
  if(err) throw err;

  process.stdout.write(
    stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n'
);

  if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
  }

  const endDate = new Date();
  console.log(chalk.cyan('打包完成了.\n'))
  console.log(chalk.cyan('开始时间：' + startDate.toLocaleString()));
  console.log(chalk.cyan('结束时间：' + endDate.toLocaleString()));
  console.log(chalk.cyan('耗时：' + (endDate.getTime() - startDate.getTime()) / 1000 + 's'));
})