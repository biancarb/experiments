const gulp = require('gulp')
const browsersync = require('browser-sync')

gulp.task('browsersync', () => {
	browsersync.init({
		server: {
			baseDir: './',
			index: './index.html'
		} 
	})
})
