var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src([
        'src/app.js',
        'src/app.routes.js',
        'src/services/auth.token.service.js',
        'src/services/*.js',
        'src/**/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', ['scripts'], function() {
  return gulp.src([
    'src/**/*.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('move', () => {
  gulp.src(['client/**/*.js'])
    .pipe(gulp.dest('server/public'));
});

gulp.task('default', ['scripts', 'styles', 'move']);


gulp.watch(['src/**/*.js', 'src/**/*.css'], ['default']);
