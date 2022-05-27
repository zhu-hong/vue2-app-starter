const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WindicssPlugin = require('windicss-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')


const _MODE = process.env.NODE_ENV
const IS_PROD = _MODE === 'production'

const { Configuration } = require('webpack')
/**
 * @type {Configuration}
 */
module.exports = {
  mode: _MODE,
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
    new WindicssPlugin(),
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: resolve(__dirname, 'index.html'),
    }),
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
  ],
}
