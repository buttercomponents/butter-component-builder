var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
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
    modules: [path.join(process.cwd(), 'node_modules')],
    alias: {
      node_modules: path.join(process.cwd(), 'node_modules'),
      btm_src: path.join (process.cwd(), 'src/index.js'),
      btm_test: path.join (process.cwd(), 'test/data.js')
    }
  },
  module: {
      rules: [{
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
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        {
          loader: 'stylus-loader',
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
          'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
    },{
        test: /\.(jpg|png|svg|woff2?|eot|ttf).*$/,
        loader: "url-loader?limit=100000"
    }]
  }
};
