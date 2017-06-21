const paths = require('../paths')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const htmlmin = require('gulp-htmlmin')
const browsersync = require('browser-sync')

gulp.task('views', () => {
	gulp
		.src(paths.views.main)
		.pipe(plumber())
		.pipe(pug())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('./'))
		.pipe(browsersync.reload({ stream: true }))
	
	gulp
		.src([paths.views.src, `!${paths.views.main}`])
		.pipe(plumber())
		.pipe(pug())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(paths.views.dest))
		.pipe(browsersync.reload({ stream: true }))
})
