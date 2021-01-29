const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 10240
                }
            }
        }, {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                'sass-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['../dist'],{
            root:path.resolve(__dirname,'../')
        })
    ],
    optimization: {
        splitChunks:{
            chunks:'all',  //默认async，只对异步代码做代码分割； initial，只对同步；
            minSize:30000,  //引入的包/模块/库大于30kb才进行代码分割
            maxSize:0, //可以不配
            minChunks:1, // 只要用了一次，就进行代码分割
            maxAsyncRequests:5, //最多同时加载5个模块，超过5个不做代码分割
            maxInitialRequests:3, //入口文件，引入的库，做代码分割最多三个
            automaticNameDelimiter:'~', //生成文件，组和文件进行链接的连接符
            name:true, //让cacheGroups文件名字有效
            cacheGroups: {
                // 根据组进行打包，node_modules里面的都放在vendors组
                vendors: {   //打包后的vendors~lodash.js 文件属于vendors组，入口文件是lodash
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'vendor.js'  //打包后名字
                },
                default: {
                    priority: -20,   //值越大优先级越高，同时满足两者的库，选择优先级高的
                    reuseExistingChunk: true, //如果一个模块已经打包过，再次遇到，不再打包，直接用
                    filename:'common.js'
                }
            }
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    }
}
