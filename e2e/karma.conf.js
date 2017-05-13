module.exports = function (config) {
  require('./set-env.js');

  var browserProvidersConf = require('./browsers.conf.js');
  var internalAngularReporter = require('./tools/reporter.js');

  var customLaunchers = browserProvidersConf.customLaunchers;
  var sauceAliases = browserProvidersConf.sauceAliases;
  var browserstackAliases = browserProvidersConf.browserstackAliases;
 
  console.log (`CI_MODE is ${config.CI_MODE} and BROWSER_KEY is ${config.BROWSER_KEY}`)

  var browsers = [];
  if (config.CI_MODE != '' && config.BROWSER_KEY != '') {
    if (config.CI_MODE == 'saucelabs') {
       browsers = sauceAliases[config.BROWSER_KEY];
    }
    else if (config.CI_MODE == 'browserstack') {  
       browsers = browserstackAliases[config.BROWSER_KEY];
    }
    console.log(browsers);
  }
  else {
      console.log("karma start karma.conf.js --CI_MODE=[browserstack|saucelabs] --BROWSER_KEY=[key]");
      process.exit(1);

  }


  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/*.js',
      'test/*.js'
    ],
    plugins: [
      'karma-jasmine',
      'karma-browserstack-launcher',
      'karma-sauce-launcher',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      internalAngularReporter,
    ],

    preprocessors: {
      '**/*.js': ['sourcemap'],
    },
    reporters: ['internal-angular'],
    sauceLabs: {
      testName: 'Angular2',
      retryLimit: 3,
      startConnect: false,
      recordVideo: false,
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public',
      options: {
        'selenium-version': '2.53.0',
        'command-timeout': 600,
        'idle-timeout': 600,
        'max-duration': 5400,
      }
    },

    browserStack: {
      project: 'Angular2',
      startTunnel: false,
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
    //browsers: Object.keys(customLaunchers),
    singleRun: true,
    captureTimeout: 180000,
    browserDisconnectTimeout: 180000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 300000,
  })


  if (process.env.TRAVIS) {
    var buildId =
      'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';
    if (process.env.CI_MODE.startsWith('saucelabs')) {
      config.sauceLabs.build = buildId;
      config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

      // TODO(mlaval): remove once SauceLabs supports websockets.
      // This speeds up the capturing a bit, as browsers don't even try to use websocket.
      console.log('>>>> setting socket.io transport to polling <<<<');
      config.transports = ['polling'];
    }

    if (process.env.CI_MODE.startsWith('browserstack')) {
      config.browserStack.build = buildId;
      config.browserStack.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }
  }
}
