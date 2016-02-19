const gulp          = require('gulp');
const babel         = require('gulp-babel');
const sourcemaps    = require("gulp-sourcemaps");
const concat        = require("gulp-concat");

gulp.task('default', function() {
    return gulp.src("src/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat("all.js"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist"));
});
