const modifyPkgUp = require('modify-pkg-up')

modifyPkgUp((pkg) => {
    if (! pkg || pkg.name === 'butter-component-builder') {
        throw(new Error(`Not Writting: ${pkg} ${process.cwd()}`))
    }

    return Object.assign(pkg,{
        main: 'dist/bundle.js',
        scripts: {
            'prepublish': 'npm run build',
            // oh npm…
            'install': 'PATH=$PATH:../.bin bcb-run install',
            'build':   'bcb-run build',
            'start':   'bcb-run start',
            'lint':    'bcb-run lint'
        }
    })
}).catch((e) => {console.error('fail', e)})
