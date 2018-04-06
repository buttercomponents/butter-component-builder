const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

const CSS_LOADER_OPTIONS = 'sourceMaps&localIdentName=[name]--[hash:base64:5]';

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map', // use cheap-eval-source-map for slower builds but better debugging
  devServer: {
    contentBase: './build',
    hot: true
  },
  entry: Object.assign(config.entry, {
    app: [
      'react-hot-loader/patch',
//      'webpack-hot-middleware/client?reload=true',
      ...(config.entry.app || []),
      path.join(__dirname, '../index.js')
    ],
  }),

  resolve: config.resolve,

  output: config.output,

  plugins: [
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
