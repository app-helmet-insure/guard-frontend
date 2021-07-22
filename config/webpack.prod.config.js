const path = require('path')
const { merge } = require('webpack-merge') // 合并配置项

const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清理 dist 目录

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩 js

const baseWebpackConfig = require('./webpack.common.config')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    app: [resolve('../src/index.jsx')],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'], // 提取公共代码
  },
  output: {
    path: resolve('../dist'),
    filename: 'js/[chunkhash:16].[name].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin()
  ],
})
