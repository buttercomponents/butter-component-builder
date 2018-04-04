require("dotenv").config({ silent: true });

const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const packageJSON = require(path.join(process.cwd(), 'package.json'));
const butter_components = new RegExp('node_modules\\'+path.sep+'(butter-.*)');

const butter_themes = new Set(Object.keys(packageJSON.devDependencies)
                                    .concat(Object.keys(packageJSON.dependencies))
                                    .filter((p) => (/(butter-theme-.*)/.test(p))))
butter_themes.add('butter-theme-base')

module.exports = {
  entry: {
    app: [
      'webpack-md-icons',
      ...butter_themes,
    ],
  },

  output: {
    path: path.join(process.env.PWD||process.cwd(), 'build'),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.join(process.cwd(), 'node_modules')],
    alias: {
      node_modules: path.join(process.cwd(), 'node_modules'),
      "~": path.join(process.cwd(), 'node_modules'),
      btm_src: path.join (process.cwd(), 'src/index.js'),
      btm_test: path.join (process.cwd(), 'test/data.js'),
    }
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../index.html')
    }),
    new ExtractTextPlugin('styles.css')
  ],

  cssConfig: (CSS_LOADER_OPTIONS) => [
    { test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [`css-loader?${CSS_LOADER_OPTIONS}`, {
          loader: "postcss-loader",
          options: {
            exclude: /node_modules/,
          }
        }]
      })
    }, {
      test: /\.(styl)$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          `css-loader?modules&${CSS_LOADER_OPTIONS}`,
          {
            loader: 'stylus-loader',
            options: {
              use: [require('nib')()],
              import: ['~nib/index.styl', path.join(__dirname, '../styl/app.styl')]
            },
          },
        ]
      }),
    }
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        //exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: process.env.NODE_ENV === "development" },
      },{
        test: /\.(jpg|png|svg|woff2?|eot|ttf).*$/,
        use: [
          'url-loader?limit=100000'
        ]
      }
    ],
  },
};
