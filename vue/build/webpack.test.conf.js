
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const path = require('path');
const config = require('../config/test.env');
const PACKAGE = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const JdistsHtml = require('../plugins/jdists-html');

const devConfig = {
    mode: config.NODE_ENV, // config.NODE_ENV
    devtool: 'cheap-module-source-map', // cheap-module-source-map
    output: {
        publicPath: config.publicPath,
        path: path.resolve(__dirname, `${PACKAGE.testSVN}/${PACKAGE.category}/${PACKAGE.projectName}`)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // 直接引用的css文件
            chunkFilename: 'css/[id].css' // 间接引用的css文件
        }),
        // new BundleAnalyzerPlugin(),  // 打开查看打包分析
        new JdistsHtml({
            remove: 'prod'
        })
    ]
};


module.exports = merge(baseConfig, devConfig);
