var username = 'pixelbits-mk'; // process.env.SAUCE_USERNAME;
var accessKey = "704b59a8-e1b1-4ee2-abd1-38a0acc6376c";//process.env.SAUCE_ACCESS_KEY;
// var SauceLabs = require("saucelabs");

// var saucelabs = new SauceLabs({
//     username: username,
//     password: accessKey
// });

// var webdriver = require('selenium-webdriver'),
//         username = username,
//         accessKey = accessKey,
//         driver;



// driver = new webdriver.Builder().
//       withCapabilities({
//             'browserName': 'chrome',
//             'platform': 'Windows XP',
//             'version': '43.0',
//             'username': username,
//             'accessKey': accessKey
//       }).
//       usingServer("http://" + username + ":" + accessKey +
//                   "@ondemand.saucelabs.com:80/wd/hub").
//       build();

// driver.get("http://saucelabs.com/test/guinea-pig");

// driver.getTitle().then(function (title) {
//         console.log("title is: " + title);
// });


// driver.quit();

// saucelabs.updateJob(driver.sessionID, {
//     name: 'this is a test',
//     passed: false
// }, function () {
//     console.log('done');
//  });

var browser = process.env.BROWSER,
  version = process.env.VERSION,
  platform = process.env.PLATFORM;

  console.log('BROWSER ' + browser);

var assert = require('assert'),
  test = require('selenium-webdriver/testing'),
  webdriver = require('selenium-webdriver'),
  SauceLabs = require("saucelabs"),
  username = username,
  accessKey = accessKey,
  saucelabs = new SauceLabs({
    username: username,
    password: accessKey
  });

test.describe('Google Search', function () {
  this.timeout(60000);

  var server = "http://" + username + ":" + accessKey +
    "@ondemand.saucelabs.com:80/wd/hub";

  var driver = new webdriver.Builder().
    withCapabilities({
      'browserName': browser,
      'platform': platform,
      'version': version,
      'username': username,
      'accessKey': accessKey
    }).
    usingServer(server).
    build();


  test.beforeEach(function () {
    driver.getSession().then(function (sessionid) {
      driver.sessionID = sessionid.id_;
    });

  });

  test.afterEach(function (done) {
    var title = this.currentTest.title,
      passed = (this.currentTest.state === 'passed') ? true : false;

    driver.quit();

    saucelabs.updateJob(driver.sessionID, {
      name: title,
      passed: passed
    }, done);
  })

  test.it('searching for webdriver using google', function () {
    driver.get('http://google.com');

    var searchBox = driver.findElement(webdriver.By.name('q'));
    searchBox.sendKeys('webdriver');
    searchBox.getAttribute('value').then(function (value) {
      assert.equal(value, 'webdriver');
    });

  });
});