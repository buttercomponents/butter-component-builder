const config = require('./webpack.prod.config');
const path = require('path');

module.exports = Object.assign(config, {
  output:  {
    path: path.join(process.env.PWD||process.cwd(), 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
});
