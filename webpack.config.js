var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    'webpack-material-design-icons',
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
      node_modules: path.join(process.cwd(), 'node_modules'),
      btm_src: path.join (process.cwd(), 'src/index.js'),
      btm_test: path.join (process.cwd(), 'test/data.json')
    }
  },
  stylus: {
    import: [path.join(__dirname, 'theme.styl'), path.join(__dirname, 'font.styl')]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        plugins: [['react-transform', {
          'transforms': [{
            'transform': 'react-transform-hmr',
            'imports': ['react'],
            'locals': ['module']
          }]
        }]],
        presets: ['es2015', 'stage-0', 'react']
      },
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
        test: /\.(jpg|png|svg|woff2?|eot|ttf).*$/,
        loader: "url-loader?limit=100000"
    }, {
      test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports-loader?jQuery=jquery'
    }] 
  }
};
