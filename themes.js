var pack = require('./package.json');

for(var theme in pack.devDependencies) {
    if(/(butter-theme-.*)/.test(theme)) {
        require(theme + '/index.css');
    }
}
