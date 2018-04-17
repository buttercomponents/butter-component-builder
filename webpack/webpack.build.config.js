const config = require('./webpack.prod.config');
const path = require('path');

module.exports = Object.assign(config, {
  entry: Object.assign(config.entry, {
    index: path.join(process.env.PWD||process.cwd(), 'index.js'),
  }),
  output:  {
    path: path.join(process.env.PWD||process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
});
