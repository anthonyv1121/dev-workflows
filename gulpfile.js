var gulp = require('gulp'),// bring in the gulp library
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');

var coffeeSources = ['components/coffee/tagline.coffee']; // can usee wildcard before extension

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true }) // bare = compiles JavaScript without putting it in a safety wrapper like it normally would
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts')) // once it's finish processing the coffee script, put new file in this location.
});
