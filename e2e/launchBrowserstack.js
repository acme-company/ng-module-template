require('./tools/setSecurityContext.js');
var exec = require('child_process').exec;
var helpers = require('../helpers.js');

module.exports = (function() {
    // execute the process
    var karma = exec(`karma start ${helpers.root('e2e/karma.conf.js')} --CI_MODE=browserstack --BROWSER_CATEGORY=CI_REQUIRED`);
    karma.stdout.pipe(process.stdout);    
})();

