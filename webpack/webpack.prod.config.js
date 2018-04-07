const config = require('./webpack.config');

const CSS_LOADER_OPTIONS = 'sourceMaps&minimize&localIdentName=[name]--[hash:base64:5]';

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: Object.assign(config.entry, {
    app: './index.js'
  }),

  resolve: config.resolve,

  output: config.output,

  optimization: {
    minimize: true,
  },

  plugins: config.plugins,

  module: {
    rules: [
      ...config.module.rules,
      ...config.cssConfig(CSS_LOADER_OPTIONS),
    ],
  },
};
