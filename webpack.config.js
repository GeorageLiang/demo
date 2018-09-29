var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var env = process.env.NODE_ENV;
/**
 * 
 */
var config = {
    // mode: "production", // "production" | "development" | "none"
         /**
         * 告知 webpack 使用相应模式的内置优化
         * cli指令  webpack --mode=production
         */
        entry:{
            index:"./src/js/index.js",
            page2:"./src/js/page2.js"
        },
        /**
         * 入口,生成依赖图谱的入口
         * 分类：单入口，对象，数组
         * 单入口；entry: './path/to/my/entry/file.js' [只有一个入口起点的应用程序或工具]
         * 数组 ；entry: {
                    main: ['./app.js', 'lodash']
                }
            【数组中的文件一般是没有相互依赖关系的，但是又处于某些原因需要将它们打包在一起】
         * 对象；entry: {
                    app: './src/app.js',
                    vendors: './src/vendors.js'
                } 
            [可扩展的 webpack 配置]
            1.使用CommonsChunkPlugin 分离 应用程序(app) 和 第三方库(vendor) 入口
            2.多页面应用程序 
    
         */
        output:{
            path:"/dist",
            publicPath:"/",
            filename: 'js/[name].js'
        },
        /**
         * 出口 控制 webpack 如何向硬盘写入编译文件
         * 对象 
         * output: {
                filename: 'bundle.js', 【文件名】
                path: '/home/proj/public/assets' 【绝对路径】
                publicPath: 'http://cdn.example.com/assets/[hash]/'[输出解析文件的目录，url 相对于 HTML 页面]
    
            }
         * 占位符号
            output: {
                filename: '[name].js',
                path: __dirname + '/dist'
            }
        
         */
        module:{
            rules:[{
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                        use: ['css-loader', 'sass-loader']
                    })
                // loader: ExtractTextPlugin.extract("style", 'css!sass-loader')
            },{
    
            }]
        },
        /**
         * loader 对模块的源代码进行转换
         *  loader 链会按照相反的顺序执行
         * 
         */
        plugins: [
            new HtmlWebpackPlugin({
                title: 'webpack',
                filename: 'index.html',
                meta: {
                    'format-detection':'telephone=no',
                    'baidu-site-verification':'CpXy294IQ6',
                    'viewport':'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0',
                },
                chunks:['vender','index']
            }),
            new HtmlWebpackPlugin({
                title: 'page2',
                filename: 'page2.html',
                meta: {
                    'format-detection':'telephone=no',
                    'baidu-site-verification':'CpXy294IQ6',
                    'viewport':'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0',
                },
                chunks:['vender','page2']
            }),
            new ExtractTextPlugin("[name].css"),
            //new ExtractTextPlugin("index.css") //提取出来的样式放在style.css文件中
        ],
        /**
         * const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
         * plugins: [
                new HtmlWebpackPlugin({template: './src/index.html'})
            ]
         */
        resolve: {
            // alias: {
            //   Utilities: path.resolve(__dirname, 'src/utilities/'),
            //   Templates: path.resolve(__dirname, 'src/templates/')
            // }
        },
        optimization: {
            splitChunks: {
              cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 1,
                    test: /[\\/]src[\\/]lib[\\/]/,
                    priority:1
                },
                vender:{
                    name: "vender",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    priority:100,
                    minChunks: 1
                }
              }
            }
          }
        /**
         * alias 针对墨块路径简称
         * import Utility from 'Utilities/utility';
         */
};


module.exports= function(env,argv){
    console.log(env);
    if (env === 'development') {
        return config;
    }
    
    if (env === 'production') {
        return config;
    }
    
      
};


