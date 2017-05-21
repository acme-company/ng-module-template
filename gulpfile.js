const helpers = require('./helpers');
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('build', shell.task('gulp build', { cwd: helpers.root('build') }));
gulp.task('test', shell.task('gulp test', { cwd: helpers.root('test') }));
gulp.task('e2e', shell.task('gulp e2e', { cwd: helpers.root('e2e') }));
gulp.task('lint', shell.task('gulp lint', { cwd: helpers.root('lint') }));

