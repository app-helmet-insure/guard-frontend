const path = require('path')
const webpack = require('webpack')
const os = require('os')
const HappyPack = require('happypack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => path.resolve(__dirname, dir)
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
})

module.exports = {
  cache: true,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': resolve('../src'),
      crypto: false,
      stream: false,
      assert: false,
      http: false,
      https: false
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        use: 'happypack/loader?id=babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: '[local]-[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
        include: resolve('../src'),
      },
      {
        oneOf: [
          {
            test: /\.less$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                      '@primary-color': '#1890ff', // 全局主色
                      '@link-color': '#1890ff', // 链接色
                      '@success-color': '#52c41a', // 成功色
                      '@warning-color': '#faad14', // 警告色
                      '@error-color': '#f5222d', // 错误色
                    },
                  },
                },
              },
            ],
            include: /node_modules/,
          },
          {
            test: /\.less$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    auto: /\.module\.\w+$/i,
                    localIdentName: '[local]-[hash:base64:5]',
                  },
                },
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
            include: resolve('../src'),
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[hash:8].[name].[ext]',
              limit: 10240,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'url-loader?esModule=false',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../public/index.html'),
      inject: 'body',
      hash: true,
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].[name].css',
      chunkFilename: 'css/[contenthash].[name].css',
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      verboseWhenProfiling: false,
      verbose: false,
    }),
  ],
}
