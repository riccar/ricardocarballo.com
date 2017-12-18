var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
   /*Initialize browser-sync to open a web browser-sync
  and display the index.html at the app folder*/
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

//Delete the content of the docs folder calls icons and wait until it finishes before start
//Use this function to triggers the sprite creation function as a dependency
gulp.task('deleteDistFolder', function() {
  return del(['./docs']);
});

//Optimize and copy all the image files to the docs folder but wait until the deleteDistFolder task finishes
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*',
    '!./app/assets/images/icons', 
    '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      //Optimize jpeg
      progressive: true,
      //Optimize gif
      interlaced: true,
      //Optimize svg
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

//Trigger the usemin function after the deleteDistFolder finishes
gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start("usemin");
})

//Before copying css and js files to the dist folder, revision and compress these files, wait until the 'styles' and 'script' functions are executed
gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src('./app/index.html')
    //Usemin compress and revision the file
    .pipe(usemin({
      css: [function() {return rev()}, function(){return cssnano()}],
      js: [function() {return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});



//build task to execute multiple build related task in the correct order
gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'useminTrigger']);