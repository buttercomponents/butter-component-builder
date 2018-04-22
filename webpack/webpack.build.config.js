const config = require('./webpack.prod.config');
const path = require('path');

const packageJSON = require(path.join(process.cwd(), 'package.json'));

module.exports = Object.assign(config, {
  entry: Object.assign(config.entry, {
    index: path.join(process.env.PWD||process.cwd(), 'index.js'),
  }),
  output:  {
    library: packageJSON.name,
    libraryTarget: 'umd',
    auxiliaryComment: packageJSON.description,
    path: path.join(process.env.PWD||process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
});
