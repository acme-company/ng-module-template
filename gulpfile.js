const pkg = require('./package.json')
const gulp = require('gulp');
const exec = require('child_process').exec;
process.chdir('build');

gulp.task('build', function(cb) {
  exec('gulp build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

