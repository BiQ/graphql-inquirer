'use strict';

var webpack = require('webpack');

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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }

    ]
  }

}

module.exports = config;