var exec = require('child_process').exec;

// execute the process
var karma = exec('karma start karma.conf.js --CI_MODE=saucelabs --BROWSER_KEY=CI_REQUIRED');
karma.stdout.pipe(process.stdout);