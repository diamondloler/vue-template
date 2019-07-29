
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const path = require('path');
const config = require('../config/prod.env');
const PACKAGE = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const JdistsHtml = require('../plugins/jdists-html');

const devConfig = {
    mode: config.NODE_ENV,
    devtool: 'none',
    output: {
        publicPath: config.publicPath,
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, `${PACKAGE.prodSVN}/${PACKAGE.category}/${PACKAGE.projectName}`)
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-pngquant')({
                                    speed: 4,
                                    quality: [0.3, 0.5]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css', // 直接引用的css文件
            chunkFilename: 'css/[id].[contenthash:8].chunk.css'// 间接引用的css文件
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), // 用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true }}, // 传递给 cssProcessor 的选项，默认为{}
        }),
        new JdistsHtml({
            remove: 'debug'
        })
    ]

};


module.exports = merge(baseConfig, devConfig);
