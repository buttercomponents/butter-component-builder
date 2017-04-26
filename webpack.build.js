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
        path: path.join(process.env.PWD||process.cwd(), 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
        libraryTarget: 'umd'
    },
    externals: {
        'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' },
        'react-dom': { commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom', root: 'ReactDOM' },
        'react-addons-css-transition-group': { commonjs: 'react-addons-css-transition-group', commonjs2: 'react-addons-css-transition-group', amd: 'react-addons-css-transition-group', root: ['React','addons','CSSTransitionGroup']},
        'react-i18next':  { commonjs: 'react-i18next', commonjs2:'react-i18next', amd: 'react-i18next', root: 'react-i18next' }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            },
            include: [
                path.join(process.env.PWD||process.cwd(), './src'),
                path.join(process.env.PWD||process.cwd(), './test'),
            ]
        }, {
            test: /\.(styl)$/,
            use: [
                'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                {
                    loader: 'stylus-loader?paths=node_modules/bootstrap-stylus/stylus/',
                    options: {
                        use: [require('nib')()],
                        import: ['~nib/index.styl', path.join(__dirname, 'styl/app.styl')]
                    },
                },
            ],
        }, {
            test: /\.(css)$/,
            use: [
                'style-loader',
                'css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
