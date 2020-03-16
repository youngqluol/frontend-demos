// webpack.config.js

const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    mode:'development', // 开发模式
    entry: {   // 多入口
        main0: path.resolve(__dirname, '../src/js/main0.js'),
        main1: path.resolve(__dirname, '../src/js/main1.js')
    },
    output: {
      filename: '[name].js',      // 打包后的文件名称
      path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    },
                    'less-loader'
                ]  // 从右向左解析原则
            },
            {
                test: /\.(jpg|jpeg|png)$/,
                use: [
                    'url-loader'
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, '../index.html'),   // 目标html
            filename: 'index.html',   // 生成的html名
            chunks: ['main0']   // 注入的模块名
        }),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../index1.html'),
            filename: 'index1.html',
            chunks: ['main1']
        }),
        new CleanWebpackPlugin()    // 打包前清空之前dist文件夹
    ]
}
