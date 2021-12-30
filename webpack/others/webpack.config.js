const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].js',
    },

    resolve: {
        extensions: [ '.webpack.js', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@src': path.join(__dirname, '/src/')
        }
    },

    mode: 'production',

    devtool: 'source-map',

    module: {
        noParse: /lodash/, //指定loader不处理lodash包
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                include: /src/ //不要指定pages，因为还有一个app.vue
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [[
                            '@babel/env', 
                            {
                                modules: false // 是modules不是module
                            }
                        ]]
                    }
                }
            },
            {
                test: /\.(stylus|styl)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'stylus-loader'
                ],
                include: /src/
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false
                    },
                },
                
                include: /src/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new DllReferencePlugin({
            manifest: require(path.join(__dirname, 'dll/manifest.json'))
        })
    ]
}