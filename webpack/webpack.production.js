const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const extractTextPlugin = require('extract-text-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {modules:true,localIdentName:'[hash:8]',minimize:true}
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new extractTextPlugin({
      filename: 'main.css',
      ignoreOrder: true
    }),
    new uglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new cleanWebpackPlugin(['dist'],{
      root: path.join(__dirname,'..')
    })
  ]
});