const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config');

const CSS_LOADER_OPTIONS = 'sourceMaps&localIdentName=[name]--[hash:base64:5]';

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map', // use cheap-eval-source-map for slower builds but better debugging
  devServer: {
    contentBase: './build',
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3000,
    progress: true
  },
  entry: Object.assign(config.entry, {
    app: [
      'react-hot-loader/patch',
      ...(config.entry.app || []),
      path.join(__dirname, '../src/index.js')
    ],
  }),

  resolve: config.resolve,

  output: config.output,

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.plugins,
  ],

  module: {
    rules: [
      ...config.module.rules,
      ...config.cssConfig(CSS_LOADER_OPTIONS),
    ],
  },
};
