
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PACKAGE = require('../package');

const fs = require('fs');
const PAGES_DIR = './src/pages';

const entry = {};
const pluginsHtml = [];
// 处理公共entry
const commonEntry = [];


// 遍历页面目录
const getPages = () => {
    return fs.readdirSync(PAGES_DIR).filter(item => {
        let filepath = path.join(PAGES_DIR, item, 'index.js');
        if (!fs.existsSync(filepath)) {
            filepath = `${filepath}x`; // jsx
        }
        if (!fs.existsSync(filepath)) {
            return false;
        }
        return true;
    });
};

getPages().forEach(file => {
    const name = path.basename(file);
    // 添加runtime脚本，和页面入口脚本
    const chunks = ['polyfill', 'vendors', 'commons', `runtime~${name}`, name];
    pluginsHtml.push(
        new HtmlWebpackPlugin({
            minify: process.env.NODE_ENV === 'development' ? false : {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
            },
            filename: `${name}.html`,
            template: `${PAGES_DIR}/${file}/index.html`,
            chunks
        })
    );

    // 加入页面需要的公共入口
    entry[name] = [...commonEntry, `${PAGES_DIR}/${file}/index`];


});


let cssLoaderArr = [
    {
        loader: 'css-loader',
        options: {
            importLoaders: 2, // 指定css-loader处理前最多可以经过的loader个数
            // modules: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: [
                require('autoprefixer')()
            ]
        }
    },
    'sass-loader',
];

if (PACKAGE.category === 'h5') {
    cssLoaderArr.splice(2, 0, {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75
        }
    });
}




// entry = {
//     page1: [ './src/pages/page1/index' ],
//     page2: [ './src/pages/page2/index' ]
// }


module.exports = {
    entry: entry,
    optimization: {
        usedExports: true,
        namedChunks: true,
        moduleIds: 'hashed',
        runtimeChunk: true,
        splitChunks: {
            chunks: 'async', // initial模式下会分开优化打包异步和非异步模块。而all会把异步和非异步同时进行优化打包。也就是说moduleA在indexA中异步引入，indexB中同步引入，initial下moduleA会出现在两个打包块中，而all只会出现一个。
            minSize: 10000, // 提高缓存利用率，这需要在http2/spdy
            maxSize: 0,
            minChunks: 1, // 共享最少的chunk数，使用次数超过这个值才会被提取
            maxAsyncRequests: 6, // 最多的异步chunk数
            maxInitialRequests: 7, // 最多的同步chunks数 cacheGroups这里5个， runtimeChunk有1个
            automaticNameDelimiter: '~', // 多页面共用chunk命名分隔符
            name: true,
            cacheGroups: {
                polyfill: {
                    test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
                    name: 'polyfill',
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true // 公共模块必开启
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    reuseExistingChunk: true,
                    minChunks: 1,
                    priority: 9
                },
                commons: {
                    name: 'commons',
                    minChunks: 2, // Math.ceil(pages.length / 3), 至少被1/3页面的引入才打入common包
                    priority: 8, // 优先级
                    reuseExistingChunk: true // 公共模块必开启
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    output: {
        filename: 'js/[name].js',
        // sourceMapFilename: 'sourcemaps/[file].map',
        path: path.resolve(__dirname, '../dist')
    },
    resolveLoader: {
        // 去哪些目录下寻找 Loader，有先后顺序之分
        modules: ['node_modules', './loaders/'],
    },
    resolve: { // 解析
        alias: {
            '@css': path.resolve(__dirname, '../src/assets/css'),
            '@views': path.resolve(__dirname, '../src/views'),
            '@modules': path.resolve(__dirname, '../src/modules')
        },
        extensions: ['.js', '.vue', '.json', '.css', '.scss']
    },
    module: {
        noParse: function(content) {
            return /jquery|lodash/.test(content); // 忽略jquery文件解析，直接编译打包
        },
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                oneOf: [
                    {
                        resourceQuery: /__inline/, // foo.css?__inline
                        use: ['style-loader']
                    },
                    {
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    hmr: process.env.NODE_ENV === 'development' // 仅dev环境启用HMR功能
                                }
                            }
                        ]
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2, // 指定css-loader处理前最多可以经过的loader个数
                            // modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash:5].min.[ext]',
                            outputPath: 'img/',
                            limit: 1000, // size <= 1KB
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash:5].min.[ext]',
                            outputPath: 'fonts/',
                            limit: 1000, // fonts file size <= 1KB, use 'base64'; else, output svg file

                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory=true', // 缓存loader执行结果 发现打包速度已经明显提升了
                exclude: [/(.|_)min\.js$/, /node_modules/],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, '../src')], // 限制范围，提高打包速度
                exclude: [/node_modules/] // 排除
            }
        ]
    },
    plugins: [
        ...pluginsHtml,
        new ScriptExtHtmlWebpackPlugin({
            custom: {
                test: /\.js$/,
                attribute: 'crossorigin',
                value: 'anonymous'
            },
            prefetch: {
                test: /\.js$/,
                chunks: 'async'
            }
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ]
};
