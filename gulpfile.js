// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation
// for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp           = require('gulp'),
    rimraf         = require('rimraf'),
    runSequence    = require('run-sequence'),
    frontMatter    = require('gulp-front-matter'),
    autoprefixer   = require('gulp-autoprefixer'),
    sass           = require('gulp-ruby-sass'),
    uglify         = require('gulp-uglify'),
    concat         = require('gulp-concat'),
    connect        = require('gulp-connect'),
    path           = require('path'),
    modRewrite     = require('connect-modrewrite'),
    dynamicRouting = require('./vendor/assets/bower_components/foundation-apps/bin/gulp-dynamic-routing');

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -

// Sass will check these folders for files when you use @import.
var sassPaths = [
  'client/assets/scss',
  'vendor/assets/bower_components/foundation-apps/scss'
];
// These files include Foundation for Apps and its dependencies
var foundationJS = [
  'vendor/assets/bower_components/fastclick/lib/fastclick.js',
  'vendor/assets/bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
  'vendor/assets/bower_components/tether/tether.js',
  'vendor/assets/bower_components/angular/angular.js',
  'vendor/assets/bower_components/angular-animate/angular-animate.js',
  'vendor/assets/bower_components/ui-router/release/angular-ui-router.js',
  'vendor/assets/bower_components/foundation-apps/js/vendor/**/*.js',
  'vendor/assets/bower_components/foundation-apps/js/angular/**/*.js'
];

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./vendor/assets/javascripts/build', cb);
});

// Copies user-created files and Foundation assets
gulp.task('copy', function() {

  // Iconic SVG icons
  gulp.src('./vendor/assets/bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./app/assets/images/iconic/'));

  // Foundation's Angular partials
  return gulp.src(['./vendor/assets/bower_components/foundation-apps/js/angular/partials/**.*'])
    .pipe(gulp.dest('./public/partials/'));
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function() {
  // Foundation JavaScript
  gulp.src(foundationJS)
    .pipe(uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('./vendor/assets/javascripts/build/'))
  ;
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy-templates', ['copy'], function() {
  return gulp.src('./app/views/templates/**/*.html')
    .pipe(dynamicRouting({
      path: 'vendor/assets/javascripts/build/routes.js',
      root: 'app/views'
    }))
    .pipe(gulp.dest('./public/templates'))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function() {
  runSequence('clean', ['copy', 'uglify'], 'copy-templates', function() {
    console.log("Successfully built.");
  })
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build'], function() {

  // Watch static files
  gulp.watch(['!./app/views/templates/**/*.*'], ['copy', 'copy-templates']);

  // Watch app templates
  //gulp.watch(['./app/views/templates/**/*.html'], ['copy-templates']);
});
