var gulp = require('gulp'),// bring in the gulp library
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [ // array of all JS documents - oder of processing is based on order in array
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true }) // bare = compiles JavaScript without putting it in a safety wrapper like it normally would
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts')) // once it's finish processing the coffee script, put new file in this location.
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js')) // the name of the file we want to build
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js')) // destination of file
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: 'builds/development/images',
      style: "expanded"
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css')) // destination of file
});
