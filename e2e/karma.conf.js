module.exports = function (config) {

  console.log(`CI_MODE is ${config.CI_MODE} and BROWSER_CATEGORY is ${config.BROWSER_CATEGORY}`);

  var customLaunchers = [];
  var categories = config.BROWSER_CATEGORY.split(',');
  var browsers = categories.reduce(function(acc, val) {
      var browserList = require('./tools/getBrowserList.js')({
        CI_MODE: config.CI_MODE,
        BROWSER_CATEGORY: val
      });
      if (customLaunchers.length == 0) {
        customLaunchers = browserList.customLaunchers;
      }
     return acc.concat(browserList.browsers);
  }, []);


  
  console.log(browsers);

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/*.js',
      'test/*.js'
    ],
    reporters: [
      'saucelabs'
    ],
    sauceLabs: {
      testName: 'Browser e2e Test',
      startConnect: !process.env.TRAVIS,
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    },
    browserStack: {
      project: 'Angular2',
      startTunnel: true,
      retryLimit: 3,
      timeout: 1800,
      pollingTimeout: 10000,
    },

    browsers: browsers,
    port: 9876,
    colors: true,
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    singleRun: true
  })


  if (process.env.TRAVIS) {
    require('./tools/assignBuildNumber.js')(config);
  }
}
