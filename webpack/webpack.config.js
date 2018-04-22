require('dotenv').config({ silent: true });

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const packageJSON = require(path.join(process.cwd(), 'package.json'));

const butter_themes = new Set(Object.keys(packageJSON.devDependencies || {})
                                    .concat(Object.keys(packageJSON.dependencies || {}))
                                    .filter((p) => (/(butter-theme-.*)/.test(p))))
butter_themes.add('butter-theme-base')

const butter_components = new Set(Object.keys(packageJSON.devDependencies || {})
                                        .concat(Object.keys(packageJSON.dependencies || {}))
                                        .filter((p) => (/(butter-component-.*)/.test(p))))

butter_components.add('butter-base-components')

const jsxConfig = {
  test: /\.jsx?$/,
  exclude: /node_modules\/[^butter]/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [[require('babel-preset-env'), {
        targets: {
          browsers: ['last 2 versions'],
          node: '6.10'
        }
      }], require('babel-preset-react'), require('babel-preset-stage-0')],
      plugins: [],
//      plugins: [require('babel-plugin-transform-runtime')],
    }
  }
}

const cssConfig = (CSS_LOADER_OPTIONS) => [
  { test: /\.css$/,
    //      exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [`css-loader?${CSS_LOADER_OPTIONS}`]
    })
  }, {
    test: /\.(styl)$/,
    //      exclude: /node_modules/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        `css-loader?modules&${CSS_LOADER_OPTIONS}`,
        {
          loader: 'stylus-loader',
          options: {
            use: [require('nib')()],
            import: ['~nib/index.styl', path.join(__dirname, '../styl/app.styl')],
          }
        }
      ]
    })
  }
]

const config = {
  entry: {
    themes: ['webpack-md-icons',...butter_themes],
  },

  output: {
    path: path.join(process.env.PWD||process.cwd(), 'build'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  externals: {
    'prop-types': 'PropTypes',

    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-i18next': 'reactI18next',
//    'react-router': 'ReactRouter',
//    'react-router-dom': 'ReactRouterDOM',
    'react-transition-group': 'ReactTransitionGroup',
    'redux': 'Redux',
    'react-redux': 'ReactRedux'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.join(process.cwd(), 'node_modules'),
      ...(Array.from(butter_components).map(c => path.join(c, 'node_modules')))
    ],
    alias: {
      node_modules: path.join(process.cwd(), 'node_modules'),
      '~': path.join(process.cwd(), 'node_modules'),
      btm_src: path.join (process.cwd(), 'src/index.js'),
      btm_test: path.join (process.cwd(), 'test/data.js'),
    }
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      name: 'manifest'
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|woff2?|eot|ttf).*$/,
        use: [
          'url-loader?limit=100000'
        ]
      }
    ],
  },
}

module.exports = {
  config: config,
  cssConfig: cssConfig,
  jsxConfig: jsxConfig
}
