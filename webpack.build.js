var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: '/static/',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0', 'react']
      },
      include: [
        path.join(process.env.PWD, './src'),
        path.join(process.env.PWD, './test'),
      ]
    }, {
      test: /\.(styl)$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
    },{
      test: /\.(css)$/,
      loader: 'style-loader!css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }, {
      test: /\.(png|svg|woff2?|eot|ttf).*$/,
      loader: "url-loader?limit=100000"
    }]
  }
};
