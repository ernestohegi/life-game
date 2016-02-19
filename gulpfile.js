const gulp          = require('gulp');
const babel         = require('gulp-babel');
const sourcemaps    = require("gulp-sourcemaps");
const concat        = require("gulp-concat");
const jshint        = require('gulp-jshint');

gulp.task('jshint', () => {
    return gulp.src('./src/es6/*.js')
      .pipe(jshint({
          esversion: 6
      }))
      .pipe(jshint.reporter('default'))
});

gulp.task('babel-es2015', () => {
    return gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', [
        'jshint',
        'babel-es2015'
    ]);
});
