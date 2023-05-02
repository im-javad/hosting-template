import gulp from "gulp";

import imagemin from "gulp-imagemin";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sassTocss = gulpSass(dartSass);

import cssCompress from "gulp-csso";

import concat from "gulp-concat";

gulp.task("copy-html", async function () {
  gulp.src("./src/*.html").pipe(gulp.dest("./dist"));
});

gulp.task("minify-imgs", async () => {
  gulp
    .src("./src/assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets/img"));
});

gulp.task("sass-to-css", async () => {
  gulp
    .src("./src/assets/sass/*.scss")
    .pipe(sassTocss().on("error", sassTocss.logError))
    .pipe(gulp.dest("./src/assets/css"));
});

gulp.task("minify-css-files", async () => {
  gulp
    .src("./src/assets/css/*.css")
    .pipe(concat("style.min.css"))
    .pipe(cssCompress())
    .pipe(gulp.dest("./dist/assets/css"));
});

gulp.task("watch", () => {
  gulp.watch("./src/*.html", gulp.series("copy-html"));
  gulp.watch("./src/assets/img/*", gulp.series("minify-imgs"));
  gulp.watch("./src/assets/sass/*.scss", gulp.series("sass-to-css"));
  gulp.watch("./src/assets/css/*.css", gulp.series("minify-css-files"));
});

gulp.task(
  "default",
  gulp.parallel(
    "copy-html",
    "minify-imgs",
    "sass-to-css",
    "minify-css-files",
    "watch"
  )
);
