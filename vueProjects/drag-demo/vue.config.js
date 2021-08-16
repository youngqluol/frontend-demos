const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const projectName = require('./package.json').name;

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
// const arg = process.argv.slice(2);
// console.log('arg:', arg);

// console.log(process.env.npm_config_zip); // npm run build --zip 时为true
// console.log(process.env.npm_config_report); // npm run build --report 时为true
const plugins = [];
if(process.env.npm_config_zip) {
  plugins.push(fileManagerPlugin);
};
if(process.env.npm_config_report) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  outputDir: './dist/dist',
  // css: {
  //   requireModuleExtension: false,
  //   // 向预处理器 Loader 传递选项
  //   loaderOptions: {
  //     less: {
  //       lessOptions: {
  //       }
  //     }
  //   }
  // },
  configureWebpack: {
    plugins,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@src': resolve('./src')
      }
    }
  },
  devServer: {
    host: 'localhost', // 指定要使用的 host。如果你希望服务器可从外部访问
    port: 8080,
    open: true,
    progress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive'
        }
      }
    }
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

function resolve(dir) {
  return path.resolve(__dirname, dir);
};
