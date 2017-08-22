const path = require('path');
const webpack = require('webpack');
// 脚手架常量配置
const constants = require('./constants');
//const loaders = require('./loaders');
//const plugins = require('./plugins');
//const isDevelopment = (process.env.NODE_ENV || "development") === "development";

module.exports = {
  devtool: constants.ISDEVELOPMENT ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  context: constants.SRC_DIR,
  entry: {
    app: constants.ISDEVELOPMENT ?
      [
        // 开发环境打包规则
        'webpack-hot-middleware/client',
        path.join(constants.SRC_DIR, 'entry.js')
      ] : [
        // 生产环境打包规则
        path.join(constants.SRC_DIR, 'entry.js')
      ]
  },
  //entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: constants.DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'stage-0',
              'react'
            ],
            plugins: [
              [
                'import',
                {
                  "libraryName": "antd",
                  "style": "css"
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    // 关于热更新
    new webpack.HotModuleReplacementPlugin(),
    // 可以保证出错时页面不阻塞，且会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin()
  ]
};