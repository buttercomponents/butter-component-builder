const modifyPkgUp = require('modify-pkg-up')

process.chdir('../../')

modifyPkgUp((pkg) => {
    if (! pkg || pkg.name === 'butter-component-builder') {
        throw(new Error('not writting'))
    }

    return Object.assign(pkg,{
        main: 'bundle.js',
        scripts: {
            'prepublish': 'npm run build',
            'install': 'bcb-run install',
            'build':   'bcb-run build',
            'start':   'bcb-run start',
            'lint':    'bcb-run lint'
        }
    })
}).catch(() => {})
