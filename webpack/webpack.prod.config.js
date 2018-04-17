const {config, cssConfig, jsxConfig} = require('./webpack.config');

const CSS_LOADER_OPTIONS = 'sourceMaps&minimize&localIdentName=[name]--[hash:base64:5]';

module.exports = Object.assign (config, {
  mode: 'production',

  devtool: 'source-map',

  resolve: config.resolve,

  output: config.output,

  optimization: {
    minimize: true,
  },

  plugins: config.plugins,

  module: {
    rules: [
      jsxConfig,
      ...config.module.rules,
      ...cssConfig(CSS_LOADER_OPTIONS),
    ],
  },
});
