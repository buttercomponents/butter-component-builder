var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'bootstrap-loader',
    'webpack-material-design-icons',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
    libraryTarget: 'umd'
  },
  externals: ['react', 'react-dom'],
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
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
        {
          loader: 'stylus-loader?paths=node_modules/bootstrap-stylus/stylus/',
          options: {
            use: [require('nib')()],
            import: ['~nib/index.styl', path.join(__dirname, 'styl/app.styl')]
          },
        },
      ],
    },{
      test: /\.(css)$/,
      use: [
          'style-loader',
          'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
    }, {
      test: /\.(jpg|png|svg|woff2?|eot|ttf).*$/,
      loader: 'url-loader?limit=100000'
    }, {
      test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports-loader?jQuery=jquery'
    }]
  }
};
