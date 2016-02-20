const gulp          = require('gulp');
const babel         = require('gulp-babel');
const sourcemaps    = require("gulp-sourcemaps");
const concat        = require("gulp-concat");
const jshint        = require('gulp-jshint');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');

const tasks =  [
    'jshint',
    'babel-es2015',
    'uglify'
];

gulp.task('jshint', () => {
    return gulp.src('./src/es6/*.js')
      .pipe(jshint({
          esversion: 6
      }))
      .pipe(jshint.reporter('default'))
});

gulp.task('babel-es2015', ['jshint'], () => {
    return gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['babel-es2015'], () => {
    return gulp.src('dist/all.js')
      .pipe(uglify())
      .pipe(rename('all.min.js'))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => gulp.watch('src/**/*.js', tasks));

gulp.task('default', tasks);
