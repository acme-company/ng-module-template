const pkg = require('./package.json')
const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require ('del');
const rollup = require('rollup');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const inlineNg2Template = require('gulp-inline-ng2-template');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pump = require('pump');
const es = require('event-stream');
const merge = require('gulp-merge-json');
const helpers = require('./helpers');
const process = require('process');

gulp.task('e2e', function(cb) {
  process.chdir(helpers.root('e2e'));
   exec('"../node_modules/.bin/gulp" test', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  }); 
});

gulp.task('test', function(cb) {
  process.chdir(helpers.root('.'));
   exec('"node_modules/.bin/karma" start karma.conf.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  }); 
});


gulp.task('clean', function() {
    return del([
        "tmp/**",
        "dist/**",
        "compiled/**"
    ]);
});

gulp.task('copy-source', ['clean'], function() {
    return es.merge(
        gulp.src('index.ts')
          .pipe(gulp.dest('tmp')),
        gulp.src([
          'src/**/*.ts',
        ])
        .pipe(inlineNg2Template({ base: '/src', useRelativePaths:true }))
        .pipe(gulp.dest('tmp/src'))
    );
});

gulp.task('compile:aot',['copy-source'], function (cb) {
  exec('ngc -p tsconfig.json', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


gulp.task('rollup', ['compile:aot'], function() {
  return rollup.rollup({
    entry: 'tmp/index.js',   
    onwarn: function (warning) {
      // Skip certain warnings
 
      // should intercept ... but doesn't in some rollup versions
      if (warning.code === 'THIS_IS_UNDEFINED') { return; }
      // intercepts in some rollup versions
      if ( warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

      if ( warning.message.indexOf("treating it as an external dependency") > -1 ) { return; }

      if (warning.message.indexOf("No name was provided for external module") > -1) { return; }

      // console.warn everything else
      console.warn(warning.message);
    }
    
  }).then( function ( bundle ) {
    bundle.write({
      dest: `tmp/bundles/${pkg.name}.umd.js`,
      format: 'umd',
      exports: 'named',
      moduleName: pkg.name,
      sourceMap: true,
      globals: {
      }
    });
    bundle.write({
      dest: `tmp/bundles/${pkg.name}.cjs.js`,
      format: 'cjs',
      exports: 'named',
      moduleName: pkg.name,
      sourceMap: true,
      globals: {
      }
    });
    bundle.write({
      dest: `tmp/bundles/${pkg.name}.amd.js`,
      format: 'amd',
      exports: 'named',
      moduleName: pkg.name,
      sourceMap: true,
      globals: {
      }
    });
    bundle.write({
      dest: `tmp/${pkg.name}/${pkg.name}.es5.js`,
      format: 'es',
      exports: 'named',
      moduleName: pkg.name,
      sourceMap: true,
      globals: {
      }
      
    })    
  });
});

gulp.task('metadata', function() {
  return gulp.src('tmp/src/**/*.metadata.json')
    .pipe(merge({
      fileName: `${pkg.name}.metadata.json`,
      startObj: [],
      mergeArrays:true,
      concatArrays:true
    }))
    .pipe(gulp.dest(`tmp/${pkg.name}`))
});

gulp.task('deploy', [], function() {
  return es.merge(
    gulp.src([
        `tmp/index.js`
      ])
      .pipe(gulp.dest(`dist`)),
    gulp.src([
        `tmp/src/**/*.js`
      ])
      .pipe(gulp.dest(`dist/src`)),
    gulp.src([
        `tmp/${pkg.name}/**/*.js`
      ])
      .pipe(gulp.dest(`dist/${pkg.name}`)),
    gulp.src([
        "tmp/bundles/**/*.js",
        "tmp/bundles/**.map"
      ])
      .pipe(gulp.dest("dist/bundles")),
    gulp.src([
        "tmp/**/*.d.ts",
        "!tmp/**/*.ngfactory.d.ts"
      ])
      .pipe(gulp.dest("dist")),
    gulp.src([
        "tmp/src/**/*.metadata.json",
        "tmp/src/**/*.ngfactory.metadata.json"
      ])
      .pipe(gulp.dest("dist/src"))
  );

});

gulp.task('minify', function (cb) {
  pump([
    gulp.src([
      'tmp/bundles/*.js',
      '!tmp/bundles/*.js.map'
    ]),
    uglify(),
    rename({ suffix: '.min' }),
    gulp.dest('tmp/bundles')
  ], cb);
});

gulp.task('bundle', ['rollup'], function(cb) {
    runSequence(['metadata','minify'], 'deploy', cb);
});

gulp.task('build', ['bundle'], function(done) {
   return del([
     "tmp/**",
     "compiled/**"
   ]);
   
});
