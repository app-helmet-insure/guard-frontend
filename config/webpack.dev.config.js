const path = require('path')
const ip = require('ip')
const { merge } = require('webpack-merge') // 合并配置项
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 优化 webpack 控制台输出

const baseWebpackConfig = require('./webpack.common.config')

const resolve = dir => path.resolve(__dirname, dir)
const port = 8080

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: resolve('../src/index.jsx'),
  devtool: 'inline-source-map',
  output: {
    path: resolve('../dist'),
    filename: 'js/[contenthash:16].[name].js',
    publicPath: '/',
  },
  devServer: {
    publicPath: '/',
    compress: true, // gzip压缩
    host: '0.0.0.0', // 允许ip访问
    open: false, // 打开浏览器
    hot: true, // 热更新
    quiet: true, // 不显示webpack的错误或警告
    historyApiFallback: true, // 解决启动后刷新404
    port, // 端口
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000',
    //     pathRewrite: {
    //       '^/api': '/',
    //     },
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `You application is running here: \n\nlocal:   \x1B[33mhttp://localhost:${port}\x1B[0m \nnetwork: \x1B[33mhttp://${ip.address()}:${port}\x1B[0m`
        ],
      }
    })
  ],
})
