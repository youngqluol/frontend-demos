//  抽离第三方模块
const path = require('path');
const Webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');

let WebpackConfig = {
  entry: {
    vendor: ['vue']  // 将第三方库放入数组
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'  // // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.resolve(__dirname, '../static/[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    })
  ]
}
const spinner = ora('building dll...');
spinner.start();

Webpack(WebpackConfig, (err, stats) => {
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
})