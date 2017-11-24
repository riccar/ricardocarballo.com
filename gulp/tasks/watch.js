const gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//Watch task to trigger other tasks when target files are modified
gulp.task('watch', function() {

  /*Initialize browser-sync*/
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  
  watch('./app/index.html', function() {
    gulp.start('html');
    //Reload browser when the index.html changes
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
   
  });
  
});

//Inject css changes into the browser without refreshing 
//but first run the styles task and wait until it finishes.
gulp.task('cssInject', ['styles'], function () {
  
    //Setup the source of the file
    return gulp.src('./app/temp/styles/styles.css')
      //pipe to the source file the browserSync stream feature
      //to refresh browser when css changes
      .pipe(browserSync.stream());
  
  });