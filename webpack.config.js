var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve:{
    modulesDirectory: path.join(process.cwd(), 'node_modules'),
    alias: {
      btm_src: path.join (process.cwd(), 'src/index.js'),
      btm_test: path.join (process.cwd(), 'test/data.json')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(process.cwd(), 'src'),
        path.join(process.cwd(), 'test'),
        path.join(__dirname, 'index.js')
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
