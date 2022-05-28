const { resolve } = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const WindicssPlugin = require('windicss-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const _MODE = process.env.NODE_ENV
const IS_PROD = _MODE === 'production'

const { Configuration } = require('webpack')
/**
 * @type {Configuration}
 */
module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name]-[contenthash:8].js',
  },
  devtool: IS_PROD ? 'none': 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
      {
        test: /\.m?js$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|postcss)$/i,
        use: [
          IS_PROD ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        loader: 'file-loader',
        options: {
          name() {
            return IS_PROD ? 'static/[contenthash:8].[ext]' : '[name].[ext]'
          },
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: resolve(__dirname, 'index.html'),
      minify: false,
    }),
    new WindicssPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[contentHash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyPlugin([
      {
        from: resolve(__dirname, 'public'),
        to: resolve(__dirname, 'dist'),
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: IS_PROD ? 'server' : 'disabled',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
          priority: -10,
          name: 'vues',
        },
        default: {
          minChunks: 2,
          name: "common",
          minSize: 3000,
          priority: -20,
        }
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    open: true,
    useLocalIp: true,
  },
}
