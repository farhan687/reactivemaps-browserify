var gulp = require('gulp');
var concat = require('gulp-concat');

var files = {
	css: {
		vendor: [
			'node_modules/sensor-js/dist/css/vendor.min.css'
		]
	},
	js: {
		vendor: [
			'node_modules/sensor-js/dist/js/vendor.min.js'
		]
	}
};

gulp.task('vendorcss', function() {
	return gulp.src(files.css.vendor)
		.pipe(concat('vendor.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('vendorjs', function() {
	return gulp.src(files.js.vendor)
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('compact', [
	'vendorcss',
	'vendorjs'
]);

gulp.task('default', ['compact']);

gulp.task('watch', ['compact', 'watchfiles']);
