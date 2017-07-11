'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {

  entry: {
    application: './src/application.js'
  },

  output: {
    path: __dirname+'/bin',
    publicPath: './bin/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'CHANGE_ME'
  },

  resolve: {
    extensions: ['.js','.jsx','.sass','.scss']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.(jpe?g|png|git|svg|woff2?|eot|ttf)$/i,
        exclude: /node_modules/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.s(a|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }

    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]

}

module.exports = config;