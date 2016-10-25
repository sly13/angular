var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('default', ['build']);

gulp.task('build', function () {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('minify', function() {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function () {
    gulp.watch('less/**/*.less', ['build']);
    gulp.watch('app/js/**/*.js', ['minify']);
});

