const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [{ 
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname,'node_modules'),
      query: {
        presets: ['env', 'react'],
        plugins: ["transform-class-properties"]
      }
    },{
      test: /\.(png|jpe?g|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          fallback: 'file-loader'
        },
      },
    },{
      test: /\.scss$/,
      use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]_[hash:4]',
            minimize: true
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new copyWebpackPlugin([
      {from: 'src/static',to: 'static/'}
    ]),
    new extractTextPlugin({
      filename: 'main.css'
    })
  ]
}