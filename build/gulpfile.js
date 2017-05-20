const pkg = require('../package.json')
const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require('del');
const runSequence = require('run-sequence');
const rename = require('gulp-rename');
const rollup = require('rollup');
const tsc = require('gulp-typescript');
const inlineNg2Template = require('gulp-inline-ng2-template');

const uglify = require('gulp-uglify');
const pump = require('pump');




gulp.task('clean-tmp', function () {
    return del([
        "src/**",
        "compiled/**"
    ]);

});
gulp.task('clean', ['clean-tmp'], function () {
    return del([
        "../dist/**"
    ], { force: true });
});

gulp.task('copy-src', ['clean'], function () {
    return gulp.src([
        '../src/**/*.ts',
        '!../src/**/*.spec.ts'
    ])
        .pipe(inlineNg2Template({ base: './src', useRelativePaths: true }))
        .pipe(gulp.dest('src'))
});

gulp.task('compile:aot', ['copy-src'], function (cb) {
    exec('"../node_modules/.bin/ngc" -p tsconfig.json', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('compile:es5', ['compile:aot'], function () {
    return gulp.src(['../dist/**/*.js'])
        .pipe(tsc({
            "target": "es5",
            "module": "es6",
            "moduleResolution": "node",
            "experimentalDecorators": true,
            "allowJs": true,
            "lib": ["es6", "dom"],
            "sourceMap": true
        }))

        .pipe(gulp.dest('../dist'));
});


gulp.task('bundle', ['compile:es5'], function () {
    return rollup.rollup({
        entry: '../dist/index.js',
        onwarn: function (warning) {
            // Skip certain warnings

            // should intercept ... but doesn't in some rollup versions
            if (warning.code === 'THIS_IS_UNDEFINED') { return; }
            // intercepts in some rollup versions
            if (warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1) { return; }

            if (warning.message.indexOf("treating it as an external dependency") > -1) { return; }

            if (warning.message.indexOf("No name was provided for external module") > -1) { return; }

            // console.warn everything else
            console.warn(warning.message);
        }

    }).then(function (bundle) {
        bundle.write({
            dest: `../dist/bundles/${pkg.name}.umd.js`,
            format: 'umd',
            exports: 'named',
            moduleName: pkg.name,
            sourceMap: true,
            globals: {
            }
        });
        bundle.write({
            dest: `../dist/bundles/${pkg.name}.cjs.js`,
            format: 'cjs',
            exports: 'named',
            moduleName: pkg.name,
            sourceMap: true,
            globals: {
            }
        });
        bundle.write({
            dest: `../dist/bundles/${pkg.name}.amd.js`,
            format: 'amd',
            exports: 'named',
            moduleName: pkg.name,
            sourceMap: true,
            globals: {
            }
        });

        bundle.write({
            dest: `../dist/${pkg.name}.es5.js`,
            format: 'es',
            exports: 'named',
            moduleName: pkg.name,
            sourceMap: true,
            globals: {
            }

        });
    });
});

gulp.task('minify', function (cb) {
  pump([
    gulp.src([
      '../dist/bundles/*.js'
    ]),
    uglify(),
    rename({ suffix: '.min' }),
    gulp.dest('../dist/bundles')
  ], cb);
});



gulp.task('build', ['bundle'], function (cb) {
    runSequence('minify', 'clean-tmp', cb);
});



