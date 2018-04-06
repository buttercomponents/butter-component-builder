#!/bin/sh

case $1 in
        install) PATH=$PATH:../.bin webpack --config ../butter-component-builder/webpack/webpack.prod.config.js --progress --profile --colors;;
        build) PATH=$PATH:../.bin webpack --config node_modules/butter-component-builder/webpack/webpack.build.config.js --progress --profile --colors;;
        start) webpack-dev-server --config node_modules/butter-component-builder/webpack/webpack.dev.config.js --progress --profile --colors --open;;
        lint) eslint src;;
        update) node node_modules/butter-component-builder/update-package.json.js;;
        *) echo "
usage $0 [install,build,start,lint]
      install:    run as a hook when installing package
      build:      generate dist/bundle.js
      start:      start a dev server to test your component
      lint:       check your javascript
      update:     update your package.json
"
esac
