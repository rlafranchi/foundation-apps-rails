// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var $        = require('gulp-load-plugins')();
//var argv     = require('yargs').argv;
var gulp     = require('gulp');
var rimraf   = require('rimraf');
var router   = require('front-router');
var sequence = require('run-sequence');

// Check for --production flag
//var isProduction = !!(argv.production);

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    '!./app/views/templates/**/*.*',
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    'vendor/assets/bower_components/fastclick/lib/fastclick.js',
    'vendor/assets/bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'vendor/assets/bower_components/tether/tether.js',
    'vendor/assets/bower_components/hammerjs/hammer.js',
    'vendor/assets/bower_components/angular/angular.js',
    'vendor/assets/bower_components/angular-animate/angular-animate.js',
    'vendor/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
    'vendor/assets/bower_components/angular-inflector/dist/angular-inflector.js',
    'vendor/assets/bower_components/foundation-apps/js/vendor/**/*.js',
    'vendor/assets/bower_components/foundation-apps/js/angular/**/*.js',
    '!vendor/assets/bower_components/foundation-apps/js/angular/app.js'
  ],
}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./public/templates', cb);
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp.src('./app/views/templates/**/*.html')
    .pipe(router({
      path: 'vendor/assets/javascripts/build/routes.js',
      root: 'app/views'
    }))
    .pipe(gulp.dest('./public/templates'))
  ;
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp.src('vendor/assets/bower_components/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest('./vendor/assets/javascripts/build/'))
  ;

  // Iconic SVG icons
  gulp.src('./vendor/assets/bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./public/images/iconic/'))
  ;

  cb();
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', ['uglify:foundation'])

gulp.task('uglify:foundation', function(cb) {
  var uglify = $.uglify()
    .on('error', function (e) {
      console.log(e);
    });

  return gulp.src(paths.foundationJS)
    .pipe(uglify)
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./vendor/assets/javascripts/build/'))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', ['copy:foundation', 'uglify'], 'copy:templates', cb);
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function () {

  // Watch JavaScript
  //gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify:app']);

  // Watch static files
  //gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch(['./app/views/templates/**/*.html'], ['copy:templates']);
});
