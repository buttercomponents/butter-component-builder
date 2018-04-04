const modifyPkgUp = require('modify-pkg-up')

process.chdir('../../')

modifyPkgUp((pkg) => {
    if (! pkg || pkg.name === 'butter-component-builder') {
        throw(new Error('not writting'))
    }

    return Object.assign(pkg,{
        scripts: {
            "prepublish": "npm run build",
            "install": "PATH=$PATH:../.bin webpack --config ../butter-component-builder/webpack/webpack.prod.config.js --progress --profile --colors",
            "build": "PATH=$PATH:../.bin webpack --config node_modules/butter-component-builder/webpack/webpack.prod.config.js --progress --profile --colors",
            "start": "node node_modules/butter-component-builder/server/server.js",
            "lint": "eslint src"
        }
    })
}).catch(() => {})
