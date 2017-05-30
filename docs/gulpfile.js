const helpers = require('../helpers');
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('client', shell.task('gulp build', { cwd: helpers.root('client') }));
gulp.task('docs', ['client'], function() {
    return gulp.src('../client/dist/**/*')
        .pipe(gulp.dest('.'));
});
