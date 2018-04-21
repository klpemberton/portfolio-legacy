// Gulp
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gulpUtil = require('gulp-util');
var watch = require('gulp-watch');
// SASS
var sass = require('gulp-sass');
var bourbon = require('bourbon').includePaths;
var neat = require('bourbon-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
// JS
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
// Images
var newer = require('gulp-newer');
var cache = require('gulp-cache');

// Add SASS, JS, and watch tasks to gulp default task
gulp.task('default', function (cb) {
	gulpSequence('sass', 'js', 'watch', cb);
});

// TODO: combine and minify all JS files, send to assets/js/main.min.js
gulp.task('js', function () {
	return gulp.src([
		'src/js/main.js'
	])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.max.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('assets/js'));
});

gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
  	.pipe(sass({
		includePaths: [bourbon, neat]
	}))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('images', function(event) {
	return gulp.src('images/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(newer('public/assets/images'))
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('public/assets/images'));
});

gulp.task('clear', function (done) {
    return cache.clearAll(done);
});

gulp.task('watch', function () {
	gulp.watch(['src/css/*.scss'], ['sass']);
	gulp.watch(['src/js/main.js', 'src/js/lib/*.js'], ['js']);
});