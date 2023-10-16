const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const packageName = require('../package.json').name;

module.exports = {
  entry: path.join(__dirname, '../src/app/index.tsx'),
  // 输出
  output: {
    path: path.resolve(__dirname, '../built'),
    publicPath: '/built/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    libraryTarget: 'umd',
    library: `${packageName}-[name]`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.join(__dirname, '../src'),
      react: path.join(__dirname, "../node_modules/react"),
      Mocks: path.join(__dirname, '../Mocks'),
      "react-dom": path.join(__dirname, "../node_modules/react-dom"),
      "react-router-dom": path.join(__dirname, "../node_modules/react-router-dom"),
      "antd": path.join(__dirname, "../node_modules/antd"),
    },
  },
  // 模式
  mode: 'development',
  watchOptions: {
    aggregateTimeout: 300,
    // 清除一些大文件的监听
    ignored: [
      path.join(__dirname, '../build'),
      path.join(__dirname, '../node_modules'),
    ],
  },
  cache: {
    type: 'filesystem',
  },
  devtool: 'eval-source-map',
  // 开发服务器
  devServer: {
    client: {
      reconnect: 3,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    // disableHostCheck: true,
    historyApiFallback: {
      index: 'config/index.html',
    },
    static: [
      {
        directory: path.join(__dirname, '../'),
        publicPath: '/',
      },
    ],
    port: 9001,
    compress: true,
    hot: true,
    liveReload: false,
    // host: 'local.qa.qa-env01.cd6fb85c0498149adbc605a498b41029c.cn-hangzhou.alicontainer.com',
    // 本地代理服务器暂时无效 (因为cgp api环境 cookie没有设置主子域名共享 导致本地代理的server权限 过不去, 因此代理方式无效)
    // proxy: {
    //   '/restapi': {
    //     target: 'http://qa.qa-env01.cd6fb85c0498149adbc605a498b41029c.cn-hangzhou.alicontainer.com',
    //     pathRewrite: { '^/restapi': '/restapi' },
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js|ts|tsx$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, '../src/styles/antd.less'),
          path.resolve(__dirname, '../node_modules/antd/'),
          path.resolve(__dirname, '../src'),
        ],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]',
                namedExport: true,
                exportLocalsConvention: 'camelCaseOnly'
              },
            }
          },
        ],
      },
      {
        test: /\.(png|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader?limit=100000',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      // 重复打包问题
      cacheGroups: {
        common: {
          // src下同步引入的模块，全部放到common.js中
          name: "common",
          test: /[\\/]src[\\/]/,
          minSize: 1,
          chunks: "initial",
          priority: 5
        },
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: 'vendors',
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
  }
}
