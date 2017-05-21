const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del');

gulp.task('clean', function () {
    return del([
        "coverage/**"
    ]);

});

gulp.task('test', ['clean'], function () {
    return gulp.src('karma.conf.js')
        .pipe(shell(['"../node_modules/.bin/karma" start <%= file.path %>'])
    )
});




