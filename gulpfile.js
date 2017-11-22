const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('default', function() {
  console.log("Luke, Gulp's working!");
});

//html task to
gulp.task('html', function(){
  console.log("Index file was modified!");
});

gulp.task('styles', function(){
  console.log("css file was modified!");
});

//Watch task to trigger other tasks when target files are modified
gulp.task('watch', function() {

  watch('./app/index.html', function() {
    gulp.start('html');
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('styles');
  });

});