require('dotenv').config({ silent: true });

const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const CWD = process.cwd()

const packageJSON = require(path.join(CWD, 'package.json'));

const butter_themes = new Set(Object.keys(packageJSON.devDependencies || {})
                                    .concat(Object.keys(packageJSON.dependencies || {}))
                                    .filter((p) => (/(butter-theme-.*)/.test(p))))
butter_themes.add('butter-theme-base')

const butter_components = new Set(Object.keys(packageJSON.devDependencies || {})
                                        .concat(Object.keys(packageJSON.dependencies || {}))
                                        .filter((p) => (/(butter-component-.*)/.test(p))))
butter_components.add('butter-base-components')
butter_components.add('butter-component-builder')

const butter_streamers = new Set(Object.keys(packageJSON.devDependencies || {})
                                       .concat(Object.keys(packageJSON.dependencies || {}))
                                       .filter((p) => (/(butter-streamer-.*)/.test(p))))
butter_streamers.add('butter-stream-server')
butter_streamers.add('butter-stream-selector')

const butter_paths = [
  ...([...butter_components].map(
    c => fs.realpathSync(`${CWD}/node_modules/${c}/`)
  )),
  ...([...butter_streamers].map(
    c => fs.realpathSync(`${CWD}/node_modules/${c}/`)
  ))
]

const jsxConfig = {
  test: /\.jsx?$/,
  exclude: [ /dist/ ],
  include: [`${CWD}/src`, `${CWD}/electron`,
            `${CWD}/node_modules/butter`,
            ...butter_paths
  ],
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
    path: path.join(process.env.PWD||CWD, 'build'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.join(CWD, 'node_modules'),
      ...butter_paths
    ],
    alias: {
      node_modules: path.join(CWD, 'node_modules'),
      '~': path.join(CWD, 'node_modules'),
      btm_src: path.join (CWD, 'src/index.js'),
      btm_test: path.join (CWD, 'test/data.js'),
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
        test: /\.svg$/,
        loader: 'babel-loader!react-svg-loader'
      },
      {
        test: /\.(jpg|png|woff2?|eot|ttf).*$/,
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
