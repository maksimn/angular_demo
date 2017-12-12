var gulp = require('gulp');
var open = require('gulp-open');
var nodemon = require('gulp-nodemon');

var config = {
	  port: 8000,
	  devBaseUrl: 'http://localhost'
}

gulp.task('nodestart', function () {
    nodemon({
        script: 'app.js'
    });
});

gulp.task('open', ['nodestart'], function() {
    gulp.src(__filename) 
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('default', ['nodestart', 'open']);
