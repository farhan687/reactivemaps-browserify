var gulp = require('gulp');
var concat = require('gulp-concat');

var files = {
	css: {
		vendor: [
			'node_modules/@appbaseio/reactivemaps/dist/css/style.min.css'
		]
	}
};


gulp.task('moveFonts', function() {
	return gulp.src([
			'node_modules/@appbaseio/reactivemaps/dist/fonts/**/*'
		])
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('vendorcss', function() {
	return gulp.src(files.css.vendor)
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('compact', [
	'vendorcss',
	'moveFonts'
]);

gulp.task('default', ['compact']);

gulp.task('watch', ['compact', 'watchfiles']);
