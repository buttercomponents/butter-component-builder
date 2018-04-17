const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const {config, jsxConfig, cssConfig} = require('./webpack.config');

const CSS_LOADER_OPTIONS = 'sourceMaps&localIdentName=[name]--[hash:base64:5]';

Array.prototype.push.apply(jsxConfig.use.options.plugins, [
  require('babel-plugin-transform-react-jsx-source'), require('react-hot-loader/babel')
])

module.exports = Object.assign(config, {
  mode: 'development',

  devtool: 'inline-source-map', // use cheap-eval-source-map for slower builds but better debugging
  devServer: {
    contentBase: './build',
    hot: true,
    overlay: {
//      warnings: true,
      errors: true
    },
    port: 3000,
    progress: true
  },
  entry: Object.assign(config.entry, {
    app: [
      'react-hot-loader/patch',
      ...(config.entry.app || []),
      path.join(__dirname, '../index.js')
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
      jsxConfig,
      ...config.module.rules,
      ...cssConfig(CSS_LOADER_OPTIONS),
    ],
  },
});
