const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');

gulp.task('e2e', function (cb) {
    return gulp.src('launchSaucelabs.js')
        .pipe(shell([
                'node <%= file.path %> IOS ANDROID SAFARI DESKTOP'
            ])
        );
            
 
});


