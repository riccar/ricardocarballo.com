const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');


gulp.task('default', function() {
  console.log("Luke, Gulp's working!");
});


gulp.task('html', function(){
  console.log("Index file was modified!");
});

//style task called from the watch task to pipe PostCSS features
gulp.task('styles', function(){
  
  console.log("Parsing CSS file");

  return gulp.src('./app/assets/styles/styles.css')
    
    //pipe the postcss features or filters to be applied to the source file
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))

    //on error function to catch errors and prevent gulp from stop running
    .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })

    //pipe the destination folder to save source file
    .pipe(gulp.dest('./app/temp/styles'));
      
});
