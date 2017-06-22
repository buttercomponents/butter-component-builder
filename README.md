butter-component-builder
=====================

[![Greenkeeper badge](https://badges.greenkeeper.io/buttercomponents/butter-component-builder.svg)](https://greenkeeper.io/)

The minimal dev environment to enable live-editing Butter React components.

### Usage
in your component root tree:

```sh
npm install butter-component-builder
```

add this to your `package.json`:
```json
  "scripts": {
    "build": "webpack --config node_modules/butter-component-builder/webpack.build.js --progress --profile --colors",
    "start": "node node_modules/butter-component-builder/server.js",
    "lint": "eslint src"
  },
```

then run:
```sh
npm start
open http://localhost:3000
```

*WARNING* currently you need to manually install
 `babel-plugin-react-transform` and `react-transform-hmr` to use the
 live-reloader… i don't really understand why that is, if you have any idea
 please PR !

your component entry point is `src/index.js`.
you can put a json file in `test/data.json`, and your component will be
mounted with the test data as props.

Your changes will appear without reloading the browser like in [this video](http://vimeo.com/100010922).

### Linting

This boilerplate project includes React-friendly ESLint configuration.

```
npm run lint
```

### Using `0.0.0.0` as Host

You may want to change the host in `server.js` and `webpack.config.js` from `localhost` to `0.0.0.0` to allow access from same WiFi network. This is not enabled by default because it is reported to cause problems on Windows. This may also be useful if you're using a VM.

### Missing Features

This boilerplate is purposefully simple to show the minimal configuration for React Hot Loader. For a real project, you'll want to add a separate config for production with hot reloading disabled and minification enabled. You'll also want to add a router, styles and maybe combine dev server with an existing server. This is out of scope of this boilerplate, but you may want to look into [other starter kits](https://github.com/gaearon/react-hot-loader/blob/master/docs/README.md#starter-kits).

### Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)

### Resources

* [Demo video](http://vimeo.com/100010922)
* [react-hot-loader on Github](https://github.com/gaearon/react-hot-loader)
* [Integrating JSX live reload into your workflow](http://gaearon.github.io/react-hot-loader/getstarted/)
* [Troubleshooting guide](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md)
* Ping dan_abramov on Twitter or #reactjs IRC
