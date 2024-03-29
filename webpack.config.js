'use strict';

require('webpack');
var path = require('path');

const env = process.env.NODE_ENV || 'development';

var config = {

  mode: env === 'development' ? 'development' : 'production',
  target: ['web', 'es5'],

  entry: {
    application: './src/application.jsx',
    example: './src/Example/index.jsx'
  },

  output: {
    path: path.join(__dirname+'/bin'),
    publicPath: path.join(__dirname, '/bin/'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'GraphQLInquirer'
  },

  resolve: {
    extensions: ['.mjs', '.js','.jsx','.sass','.scss'],

    alias: {
      AppPath: path.resolve(__dirname, 'src/App/'),
      UtilityPath: path.resolve(__dirname, 'src/Utility/'),
      StylePath: path.resolve(__dirname, 'src/Styles/'),
    }

  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
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
  }
};

module.exports = config;
