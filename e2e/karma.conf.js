module.exports = function(config) {

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '50.0',
      platform: 'Windows 10'
    },
    // 'SL_Firefox': 
    //   base: 'SauceLabs',
    //   browserName: 'firefox',
    //   version: '50.0',
    //   platform: 'Windows 10'
    // },
    // 'SL_InternetExplorer': {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   version: '11.0',
    //   platform: 'Windows 7'
    // },
    // 'SL_Safari': {
    //   base: 'SauceLabs',
    //   browserName: 'safari',
    //   platform: 'OS X 10.11',
    //   version: '10.0'
    // }
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'tests/*.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'saucelabs'],


    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'Karma and Sauce Labs demo',
      startConnect: false,
      //username: 'pixelbits-mk',
      //accessKey: '704b59a8-e1b1-4ee2-abd1-38a0acc6376c',
      //build: '20',
      //tunnelIdentifier: 'autoGeneratedTunnelID'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
