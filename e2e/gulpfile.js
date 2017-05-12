const gulp = require('gulp');
const mocha = require('gulp-mocha');
const process = require('process');
const runSequence = require('run-sequence');
var env = require('gulp-env');

gulp.task('default', ['tests']);
gulp.task('test', function(done) {
    runSequence(
        'run_XP_firefox_42',
        'run_Linux_chrome_45',
        'run_Windows7_ie_11'
    , done);
});

gulp.task('run_XP_firefox_42', function() {
    return gulp.src('**/*.e2e.js', {read: false})
      .pipe(env.set({
          BROWSER: 'firefox',
          PLATFORM: 'XP',
          VERSION: '42'
      }))
	  .pipe(mocha());
});
 
gulp.task('run_Linux_chrome_45', function() {
    return gulp.src('**/*.e2e.js', {read: false})
      .pipe(env.set({
          BROWSER: 'chrome',
          PLATFORM: 'Linux',
          VERSION: '45'
      }))
	  .pipe(mocha());
});

gulp.task('run_Windows7_ie_11', function() {
    return gulp.src('**/*.e2e.js', {read: false})
      .pipe(env.set({
          BROWSER: 'internet explorer',
          PLATFORM: 'Windows 7',
          VERSION: '11'
      }))
	  .pipe(mocha());
});

