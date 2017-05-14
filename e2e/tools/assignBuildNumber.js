module.exports = function (config) {
    var buildId = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;

    if (config.CI_MODE == 'saucelabs') {
        config.sauceLabs.build = buildId;
        config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

        // TODO(mlaval): remove once SauceLabs supports websockets.
        // This speeds up the capturing a bit, as browsers don't even try to use websocket.
        console.log('>>>> setting socket.io transport to polling <<<<');
        config.transports = ['polling'];
    }
    if (config.CI_MODE == 'browserstack') {
        config.browserStack.build = buildId;
        config.browserStack.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }

}



