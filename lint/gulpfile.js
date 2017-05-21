const helpers = require('../helpers');
const gulp = require('gulp');
const shell = require('gulp-shell');
const es = require('event-stream');

gulp.task('lint', shell.task(
    '"../node_modules/.bin/tslint" ' +
    '-c "tslint.json" ' + 
    '"../src/**/*.ts" ' + 
    '--exclude "../src/**/*.d.ts" ' + 
    '--exclude "../src/**/*.spec.ts"'));
