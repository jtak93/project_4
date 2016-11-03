var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src([
        'server/public/clientapp/src/app.js',
        'server/public/clientapp/src/app.routes.js',
        'server/public/clientapp/src/services/auth.token.service.js',
        'server/public/clientapp/src/services/*.js',
        'server/public/clientapp/src/**/*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('server/public/js'));
});

gulp.task('styles', ['scripts'], function() {
  return gulp.src([
    'src/**/*.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('server/public/assets/css'));
});

gulp.task('default', ['scripts', 'styles']);


gulp.watch(['src/**/*.js', 'src/**/*.css'], ['default']);
