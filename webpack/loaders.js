const path = require('path');
const constants = require('./constants');
// 分离样式文件插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const isDevelopment = (process.env.NODE_ENV || "development") === "development";

const jsx = {
  test: /\.js|jsx$/,
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
          'react-hot-loader/babel'
        ],
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
};

// const jsx = {
//   test: /\.(js|jsx)$/,
//   exclude: /(node_modules)/,
//   use: [{
//     loader: 'babel-loader',
//     options: {
//       plugins: [
//         [
//           'react-css-modules', {
//             context: constants.SRC_DIR,
//             filetypes: {
//               '.less': 'postcss-less'
//             },
//             generateScopedName: '[path]_[name]_[local]_[hash:base64:5]',
//           }
//         ],
//         // import js and css modularly (less source files)
//         [
//           'import', {
//             libraryName: 'antd-mobile',
//             style: 'css'
//           }
//         ]
//       ],
//     },
//   }],
// };

const antdStyle = {
  test: /\.(css|less)$/,
  include: [
    /node_modules\/.*antd-mobile\/.*/,
    /node_modules\\.*antd-mobile\\.*/,
    /node_modules\/.*antd\/.*/,
    /node_modules\\.*antd\\.*/,
    /node_modules\/.*normalize\.css\/.*/,
    /node_modules\\.*normalize\.css\\.*/,
  ],
  use: constants.ISDEV ?
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[local]'
          }
        },
        {
          loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'less-loader'
        }
      ]
    })
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[local]'
          }
        },
        {
          loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'less-loader'
        }
      ]
    })
};

const less = {
  // 当前项目的less文件，启用CSS modules
  test: /\.less$/,
  include: [
    constants.SRC_DIR,
    constants.COM_DIR,
  ],
  exclude: [
    constants.NODE_MODULES_DIR,
  ],
  use: constants.ISDEV ? 
    [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 3,
          //localIdentName: '[path][name]-[local]-[hash:base64:5]',
          localIdentName: '[local]'
        }
      },
      {
        // 这是一个自定义的loader，是为了解决less-loader在启用模块化时无法正确解析到在less文件中引用的外部地址的问题。请参考less-loader的这个issue。
        // https://github.com/webpack-contrib/less-loader/issues/109
        loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')()
          ]
        }
      },
      {
        loader: 'less-loader'
      }
    ]
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 3,
            localIdentName: '[local]'
          }
        },
        {
          loader: path.resolve(__dirname, 'less-css-modules-assets-fix-loader.js')
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        },
        {
          loader: 'less-loader'
        }
      ]
    })
};

// const less = {
//   test: /\.less$/,
//   include: [
//     path.resolve(__dirname, '../src')
//   ],
//   use: isDevelopment ?
//     [
//       'style-loader',
//       'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
//       'postcss-loader',
//       'less-loader',
//     ] :
//     ExtractTextPlugin.extract({
//       fallback: 'style-loader',
//       use: [
//         'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
//         'postcss-loader',
//         'less-loader',
//       ],
//     })
// }

const css = {
  //test: /\.css$/,
  // 不带 -custom 结尾的样式文件，让webpack调用css-loader和style-loader默认处理
  test: /^((?!(-custom)).)*\.css$/,
  include: [
    constants.SRC_DIR,
    constants.COM_DIR,
  ],
  exclude: [
    constants.NODE_MODULES_DIR,
  ],
  use: constants.ISDEV ?
    ['css-hot-loader'].concat(ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        }
      ]
    }))
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        }
      ]
    })
};

const cssCustom = {
  // 带 -custom 结尾的样式文件使用 css-loader 的启用了模块化处理，能够在js中以对象的方式应用css样式
  test: /-custom\.css$/,
  include: [
    constants.SRC_DIR,
    constants.COM_DIR,
  ],
  exclude: [
    constants.NODE_MODULES_DIR,
  ],
  use: constants.ISDEV ?
    ['css-hot-loader'].concat(ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        }
      ]
    }))
    :
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        }
      ]
    })
};

// const css = {
//   test: /\.css$/,
//   include: [
//     constants.SRC_DIR,
//   ],
//   use: isDevelopment ?
//     [
//       'style-loader',
//       'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
//       'postcss-loader',
//     ] :
//     ExtractTextPlugin.extract({
//       fallback: 'style-loader',
//       use: [
//         'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
//         'postcss-loader',
//       ],
//     })
// };

const woff = {
  test: /\.woff(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
};

const woff2 = {
  test: /\.woff2(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
};

const otf = {
  test: /\.otf(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=font/opentype'
};

const ttf = {
  test: /\.ttf(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
};

const eot = {
  test: /\.eot(\?.*)?$/,
  include: [
    path.join(constants.ASSETS_DIR, 'iconfont'),
  ],
  use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]'
};

const assets = {
  test: /\.(jpe?g|png|gif)$/i,
  include: [
    path.join(constants.ASSETS_DIR, 'img'),
    /node_modules\/.*antd-mobile\/.*/,
    /node_modules\\.*antd-mobile\\.*/,
    /node_modules\/.*antd\/.*/,
    /node_modules\\.*antd\\.*/
  ],
  use: ['url-loader?limit=10000!img-loader?progressive=true'],
};

// const assets = {
//   test: /\.(jpe?g|png|gif)$/i,
//   include: [
//     constants.SRC_DIR,
//     /node_modules\/.*antd-mobile\/.*/,
//     /node_modules\\.*antd-mobile\\.*/
//   ],
//   use: ['url-loader?limit=10000!img-loader?progressive=true'],
// };

const svg = {
  test: /\.(svg)$/i,
  include: [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
    path.join(constants.ASSETS_DIR, 'svg'),
  ],
  use: [
    'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=image/svg+xml',
    'svg-sprite-loader',
  ]
};

// const svgSprite = {
//   test: /\.(svg)$/i,
//   include: [
//     require.resolve('antd-mobile').replace(/warn\.js$/, ''),
//     path.join(constants.ASSETS_DIR, 'svg'),
//   ],
//   use: 'svg-sprite-loader',
// };

module.exports = {
  jsx: jsx,
  antdStyle: antdStyle,
  less: less,
  css: css,
  cssCustom: cssCustom,
  woff: woff,
  woff2: woff2,
  otf: otf,
  ttf: ttf,
  eot: eot,
  assets: assets,
  svg: svg,
};
