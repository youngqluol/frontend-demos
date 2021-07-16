const FileManagerPlugin = require('filemanager-webpack-plugin');
const projectName = require('./package.json').name;
const fileManagerPlugin = new FileManagerPlugin({
  events: {
    onEnd: {
      mkdir: ['./dist'],
      delete: [
        `./dist/dist.zip`
      ],
      archive: [
        {source: `./dist`, destination: `./dist/dist.zip`}
      ]
    }
  }
});

module.exports = {
  configureWebpack: {
    plugins: [fileManagerPlugin]
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
