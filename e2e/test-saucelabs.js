var exec = require('child_process').exec;
var helpers = require('../helpers.js');

// execute the process
var karma = exec(`karma start ${helpers.root('e2e/karma.conf.js')} --CI_MODE=saucelabs --BROWSER_KEY=CI_REQUIRED`);
karma.stdout.pipe(process.stdout);