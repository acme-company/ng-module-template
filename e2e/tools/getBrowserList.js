module.exports = function(config) {
    var browserProvidersConf = require('../browsers.conf.js');

    var browsers=[];

    if (config.CI_MODE == 'saucelabs') {
         var sauceAliases = browserProvidersConf.sauceAliases;
         browsers = sauceAliases[config.BROWSER_CATEGORY];
    }

    if (config.CI_MODE == 'browserstack') {  
        var browserstackAliases = browserProvidersConf.browserstackAliases;
        browsers = browserstackAliases[config.BROWSER_CATEGORY];
    }    
 
    return {
        browsers: browsers,
        customLaunchers: browserProvidersConf.customLaunchers
    };     
}