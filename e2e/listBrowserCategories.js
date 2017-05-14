

module.exports = (function() {
    var browserData = require('./browsers.conf.js');
    var launchers = browserData.customLaunchers;

    var sauceKeys = Object.keys(browserData.sauceAliases).sort();
    sauceKeys.forEach(function(key) {
        console.log(`${key}`);
        console.log('-----------------------');
        for (var i = 0; i < browserData.sauceAliases[key].length; ++i) {
            let item = launchers[browserData.sauceAliases[key][i]];
            item = item || {};
            console.log(` ${browserData.sauceAliases[key][i]}  -->  { ${item.browserName}, ${item.platform}, ${item.version} }`);
        }
        console.log('');

    }, this);

    var browserStackKeys = Object.keys(browserData.browserstackAliases).sort();
    browserStackKeys.forEach(function(key) {
        console.log(`${key}`);
        console.log('-----------------------');
        for (var i = 0; i < browserData.browserstackAliases[key].length; ++i) {
            let item = launchers[browserData.browserstackAliases[key][i]];
            item = item || {};
            console.log(` ${browserData.browserstackAliases[key][i]}  -->  { ${item.browser || item.device }, ${item.os}, ${item.os_version} }`);

        }
        console.log('');

    }, this);

    
})();