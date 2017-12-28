'use strict';

var webpack = require('webpack');

var config = {

  entry: {
    application: ['babel-polyfill', './src/application.js'],
    example: './src/Example/index.jsx'
  },

  output: {
    path: __dirname+'/bin',
    publicPath: './bin/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'GraphQLInquirer'
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
    contentBase: __dirname+'/example',
    publicPath: '/bin/',
    port: 9090,
    historyApiFallback: true
    /*,
    proxy: {
      "/search/person": {
        target: "https://staging.biq.dk/", //search/person.json
        secure: false,
        changeOrigin: true,
        pathRewrite: function(path, req) {
          let key_prepend = (path.indexOf('?') >= 0) ? '&' : '?';
          let newPath = path+key_prepend+"key=UssNHH6YJvmzbvNbnfg6"
          return newPath;
        }
      },
      "/sixdegrees": {
        target: "http://fodor.biq.dk/api/v1/",
        secure: false,
        changeOrigin: true,
        pathRewrite: function(path, req) {
          let key_prepend = (path.indexOf('?') >= 0) ? '&' : '?';
          let newPath = path+key_prepend+"key=UssNHH6YJvmzbvNbnfg6"
          return newPath;
        }
      }
    }*/
  }

}

module.exports = config;