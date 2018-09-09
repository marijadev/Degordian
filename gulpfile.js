var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// SCSS modules to CSS concat
gulp.task('css', function () {
    return gulp.src(['scss/main.scss', 'scss/modules/**/*.scss'])
        .pipe(concat('modules.scss'))
        .pipe(gulp.dest('scss'))
        .pipe(sass())
        .pipe(prefix('last 3 versions'))
        .pipe(concat('modules.css'))
        .pipe(gulp.dest('css'))
});

// CSS concat with vendors and minify
gulp.task('cssmin', ['css'], function () {
    return gulp.src(['css/vendor/*.css', 'css/modules.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
});

// JS concat with vendors and uglify
gulp.task('js', function () {
    return gulp.src([
            'js/vendor/jquery.3.3.1.min.js',
            'js/vendor/counter.js',
            'js/vendor/greenSock.js',
            'js/vendor/swiper.js',
            'js/vendor/isOnScreen.js',
            'js/main.js'
        ])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
});

// Watch
gulp.task('watch', function () {
    gulp.watch(['scss/main.scss', 'scss/modules/**/*.scss'], ['css', 'cssmin']);
    gulp.watch('js/main.js', ['js']);
});