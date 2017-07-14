var gulp = require('gulp'),// bring in the gulp library
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

    var env,
        coffeeSources,
        jsSources,
        sassSources,
        htmlSources,
        jsonSources,
        outputDir,
        sassStyle;

env = process.env.NODE_ENV || 'development';
console.log(env);
        if (env==='development') {
          outputDir = 'builds/development/';
          sassStyle = 'expanded';
        } else {
          outputDir = 'builds/production/';
          sassStyle = 'compressed';
        }

coffeeSources = ['components/coffee/tagline.coffee'];
jsSources = [ // array of all JS documents - oder of processing is based on order in array
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html']; // all html files
jsonSources = [outputDir + 'js/*.json'];

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
    .pipe(gulpif(env === 'production', uglify() )) // if conditional to uglify JS
    .pipe(gulp.dest(outputDir + 'js')) // destination of file
    .pipe(connect.reload()) // reload when chnages are made
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: outputDir + 'images',
      style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css')) // destination of file
    .pipe(connect.reload()) //reload when chnages are made
});
// Sample Task to run numerous tasks
//gulp.task('all', ['coffee', 'js', 'compass']);

//Watch task
gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(jsonSources)
    .pipe(connect.reload())
});

//gulp-connect allows creation of a local server
gulp.task('connect', function() {
  connect.server({
    root: outputDir, // root of application
    livereload: true
  })
});

// Default task when you run gulp in the Terminal
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);
