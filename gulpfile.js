const gulp = require("gulp");
const babel = require("gulp-babel");
const react = require("gulp-react");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");

const tasks = ["jshint", "babel-es2015", "uglify"];

const path = {
  jsAll: [
    "./src/*.js"
  ],
  jsAllWatch: [
    "./src/*.js",
  ],
  distFolder: "./dist",
  finalFileName: "all.js",
  finalFileNameMinified: "all.min.js"
};

gulp.task("jshint", () => {
  return gulp
    .src(path.jsAll)
    .pipe(
      jshint({
        esversion: 6
      })
    )
    .pipe(jshint.reporter("default"));
});

gulp.task("babel-es2015", ["jshint"], () => {
  return gulp
    .src(path.jsAll)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(concat(path.finalFileName))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.distFolder));
});

gulp.task("uglify", ["babel-es2015"], () => {
  return gulp
    .src(path.distFolder + "/" + path.finalFileName)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(path.finalFileNameMinified))
    .pipe(gulp.dest(path.distFolder));
});

gulp.task("watch", () => gulp.watch(path.jsAllWatch, tasks));

gulp.task("default", tasks);
