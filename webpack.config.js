const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WindiCssWebpackPlugin = require('windicss-webpack-plugin')


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
    filename: '[name]-[contentHash:8].js',
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-nested',
                ],
              },
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new WindiCssWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[contentHash:8].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
}
