const modifyPkgUp = require('modify-pkg-up')

process.chdir('../../')

modifyPkgUp((pkg) => {
    if (! pkg || pkg.name === 'butter-component-builder') {
        throw(new Error('not writting'))
    }

    return Object.assign(pkg,{
        scripts: {
            'prepublish': 'npm run build',
            'install': './run.sh install',
            'build':   './run.sh build',
            'start':   './run.sh start',
            'lint':    './run.sh lint'
        }
    })
}).catch(() => {})
