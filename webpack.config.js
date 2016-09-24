const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

/* eslint max-len: 0*/

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: './dist',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.resolve('src')
    }, {
      test: /\.css$/,
      loaders: [
        'style',
        'css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'
      ]
    }, {
      test: /\.html$/,
      loader: 'ng-cache?prefix=[dir]/[dir]'
    }],
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      include: path.resolve('src')
    }],
    resolve: {
      alias: {
        angular$: path.resolve('src', 'vendor', 'angular.js'),
        npm$: path.resolve('node_modules')
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      inject: 'body'
    }),
    new ProgressBarPlugin({
      format: chalk.yellow.bold('  Building Development [:bar] ') + chalk.green.bold(':percent') + chalk.bold(' (:elapsed seconds)'),
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    stats: {
      chunkModules: false,
      colors: true
    },
    contentBase: './src'
  },
  eslint: {
    configFile: '.eslintrc'
  }
};
