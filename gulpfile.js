const gulp          = require('gulp');
const babel         = require('gulp-babel');
const react         = require('gulp-react');
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

const paths = {
    jsAll: [
        './src/es6/*.js',
        './src/jsx/*.jsx'
    ],
    es6All: './src/es6/*.js',
    distFolder: './dist',
    finalFileName: 'all.js',
    finalFileNameMinified: 'all.min.js'
};

gulp.task('jshint', () => {
    return gulp.src(paths.es6All)
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('default'))
});

gulp.task('babel-es2015', ['jshint'], () => {
    return gulp.src(paths.jsAll)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat(paths.finalFileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.distFolder));
});

gulp.task('uglify', ['babel-es2015'], () => {
    return gulp.src(paths.distFolder + '/' + paths.finalFileName)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(paths.finalFileNameMinified))
        .pipe(gulp.dest(paths.distFolder));
});

gulp.task('watch', () => gulp.watch(paths.jsAll, tasks));

gulp.task('default', tasks);
