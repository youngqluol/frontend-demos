// webpack.config.js

const Webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPligin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');  // 抽离第三方模块
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {   // 入口
        main: path.resolve(__dirname, '../src/main.js'),
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
                    devMode ? 'vue-style-loader' : MiniCssExtractPligin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPligin.loader,
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
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|avi|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]' 
                            }
                        }
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]' 
                            }
                        }
                    }
                }
            },
            {
                test: /\.js$/,   // 解析js
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,  // 开启缓存
                        presets: [['@babel/preset-env', { modules: false }]],  //注意 需要两层中括号包起来（大坑）
                        plugins: [['@babel/plugin-transform-runtime']]
                        },
                    },
                exclude: /node_modules/,
                // include: path.resolve(__dirname, 'src') // 尽量避免 exclude，更倾向于使用 include。
            },
            {
                test: /\.vue$/,    //解析vue
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    resolve: {   //别名及扩展
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.runtime.esm.js'
        },
        extensions: [
            '*', '.js', '.vue', '.json'
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template:path.resolve(__dirname, '../index.html'),   // 目标html(将模块注入到哪个html中)
            filename: 'index.html',   // 生成的html名
            chunks: ['main']   // 注入的模块名
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('../static/js/vendor.dll.js'), // 这个路径是你的dll文件路径 
            includeSourcemap: false  // 这里是因为我开启了sourcemap。 不这么写会报错。
          }),
        // new htmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../index1.html'),
        //     filename: 'index1.html',
        //     chunks: ['main1']
        // }),
        new CleanWebpackPlugin(),    // 打包前清空之前dist文件夹
        new MiniCssExtractPligin({   // 拆分css
            filename: devMode ? '[name].css' : '[name]@[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id]@[hash].css'
        }),
        new vueLoaderPlugin(),
        new Webpack.DllReferencePlugin({  // 抽离第三方模块(第一种方法)
            context: __dirname,
            manifest: require(path.resolve(__dirname, '../static/vendor-manifest.json'))
          }),
        // new AutoDllPlugin({ // 抽离第三方模块(第二种方法)
        //     inject: true,
        //     debug: true,
        //     filename: '[name]@[hash].js',
        //     path: './dll',
        //     entry: ['vue', 'vue-router', 'vuex']
        // }),
        new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
            {from: '../static', to:'../dist'}
            ]),
    ]
}
