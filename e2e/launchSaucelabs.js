module.exports = (function() {

    var exec = require('child_process').exec;
    var helpers = require('../helpers.js');

    require('./tools/setSecurityContext.js');

    // execute the process
    var karma = exec(`karma start ${helpers.root('e2e/karma.conf.js')} --CI_MODE=saucelabs --BROWSER_CATEGORY=CI_REQUIRED`);
    karma.stdout.pipe(process.stdout);
    
})();

