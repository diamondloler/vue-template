const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const path = require('path');
const config = require('../config/test.env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JdistsHtml = require('../plugins/jdists-html');

const devConfig = {
    mode: config.NODE_ENV,
    devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: 'http://localhost:8080/',
    },
    module: {
        rules: []
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // 直接引用的css文件
            chunkFilename: 'css/[id].css'// 间接引用的css文件
        }),
        new JdistsHtml({
            remove: 'prod'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // open: true, // 自动打开浏览器
        // port: 8080,
        hot: true, // 启用webpack的热模块替换功能
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        // proxy: {
        //     // 跨域代理转发
        //     '/comments': {
        //         target: 'https://m.weibo.cn',
        //         changeOrigin: true,
        //         logLevel: 'debug',
        //         headers: {
        //             Cookie: ''
        //         }
        //     }
        // }
        // hotOnly: true,
        // devServer.hot在没有页面刷新的情况下启用热模块替换作为构建失败时的后备
    }
};


module.exports = merge(baseConfig, devConfig);
