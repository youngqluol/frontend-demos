const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const projectName = require('./package.json').name;
const fileManagerPlugin = new FileManagerPlugin({
  events: {
    onEnd: {
      mkdir: ['./dist'],
      delete: [
        `./dist/dist.zip`
      ],
      archive: [
        {source: `./dist/dist`, destination: `./dist/dist.zip`}
      ]
    }
  }
});
const plugins = [];

const arg = process.argv.slice(2);
console.log('arg:', arg);

console.log(process.env.npm_config_zip); // npm run build --zip 时为true
console.log(process.env.npm_config_report); // npm run build --report 时为true
if(process.env.npm_config_zip) {
  plugins.push(fileManagerPlugin);
};
if(process.env.npm_config_report) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  outputDir: './dist/dist',
  configureWebpack: {
    plugins
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true;
        return options;
      });
  }
};

function formatDate() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1 > 10 ? new Date().getMonth() : '0' + (new Date().getMonth() + 1);
  const day = new Date().getDate() > 10 ? new Date().getDate() : '0' + new Date().getDate();
  const hour = new Date().getHours() > 10 ? new Date().getHours() : '0' + new Date().getHours();
  const minute = new Date().getMinutes() > 10 ? new Date().getMinutes() : '0' + new Date().getMinutes();
  return year + month + day + hour + minute;
}
