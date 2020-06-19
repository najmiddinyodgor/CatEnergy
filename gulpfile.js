'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const rimraf = require('rimraf');

const server = require('browser-sync').create();

gulp.task('html', function (done) {
    return gulp.src('./src/*.html')
        .pipe(fileinclude({
          prefix: '@@'
        }))
        .pipe(gulp.dest('./src/'))
        .pipe(server.stream());
    done();
});

gulp.task('js', function (done) {
    gulp.src('./src/js/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/js/'))
        .pipe(server.stream());
    done();
});

gulp.task('style', function (done) {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest('./src/css/'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css/'))
        .pipe(server.stream());
    done();
});

gulp.task('webserver', function(done) {
    server.init({
      server: {
          baseDir: './src/',
          index: 'index.html'
      },
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
    done();
});

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss').on('change', gulp.parallel('style'));
});

gulp.task('clean', function (cb) {
    rimraf('./build',cb);
});

gulp.task('default', gulp.parallel('watch', 'webserver'));
