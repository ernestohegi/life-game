const gulp          = require('gulp');
const babel         = require('gulp-babel');
const react         = require('gulp-react');
const sourcemaps    = require("gulp-sourcemaps");
const concat        = require("gulp-concat");
const jshint        = require('gulp-jshint');
const uglify        = require('gulp-uglify');
const rename        = require('gulp-rename');
const plumber       = require('gulp-plumber');

const tasks =  [
    'jshint',
    'babel-es2015',
    'transform-jsx-to-js',
    'uglify'
];

const path = {
    es6All: './src/es6/*.js',
    jsAll: [
        './src/reflux/action/cell-status-action.js',
        './src/reflux/store/cell-status-store.js',
        './src/react/js/cell.js',
        './src/react/js/cell-container.js',
        './src/react/js/organism.js',
        './src/es6/*.js'
    ],
    jsAllWatch: [
        './src/es6/*.js',
        './src/react/jsx/*.jsx'
    ],
    reactJsx: './src/react/jsx/*.jsx',
    reactJsFolder: './src/react/js',
    distFolder: './dist',
    finalFileName: 'all.js',
    finalFileNameMinified: 'all.min.js'
};

gulp.task('jshint', () => {
    return gulp.src(path.jsAll)
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('default'))
});

gulp.task('babel-es2015', ['jshint'], () => {
    return gulp.src(path.jsAll)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                'es2015',
                'react'
            ]
        }))
        .pipe(concat(path.finalFileName))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.distFolder));
});

gulp.task('transform-jsx-to-js', ['jshint'], () => {
    return gulp.src(path.reactJsx)
        .pipe(plumber())
        .pipe(react())
        .pipe(gulp.dest(path.reactJsFolder));
});


gulp.task('uglify', ['babel-es2015', 'transform-jsx-to-js'], () => {
    return gulp.src(path.distFolder + '/' + path.finalFileName)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(path.finalFileNameMinified))
        .pipe(gulp.dest(path.distFolder));
});

gulp.task('watch', () => gulp.watch(path.jsAllWatch, tasks));

gulp.task('default', tasks);
