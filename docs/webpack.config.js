'use strict';

var webpack = require('webpack');
var path = require('path');

var config = {

  entry: {
    application: './src/application.jsx'
  },

  output: {
    path: path.join(__dirname+'/bin'),
    publicPath: path.join(__dirname, '/bin/'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js','.jsx','.sass','.scss'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
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
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader'
      }

    ]
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/bin/',
    port: 9090,
    historyApiFallback: true
  }
};

module.exports = config;