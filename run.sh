#!/bin/sh
arg=$1; shift

for p in ./node_modules ../ ../../; do
        test -d $p/butter-component-builder && BCB_PATH=$p
done

case $arg in
        install) PATH=$PATH:../.bin:../../.bin node ${BCB_PATH}/butter-component-builder/update-package.json.js;;
        build) PATH=$PATH:../.bin webpack --config ${BCB_PATH}/butter-component-builder/webpack/webpack.build.config.js --progress --profile --colors $@;;
        start) webpack-dev-server --config ${BCB_PATH}/butter-component-builder/webpack/webpack.dev.config.js --progress --profile --colors $@;;
        open) $0 start --open $@;;
        lint) standard --env mocha src/**.js test/**.js $@;;
        update) node ${BCB_PATH}/butter-component-builder/update-package.json.js $@;;
        *) echo "
usage $0 [install,build,start,lint]
      install:    run as a hook when installing package
      build:      generate dist/bundle.js
      start:      start a dev server to test your component
      lint:       check your javascript
      update:     update your package.json
"
esac
