var gulp = require('gulp');
var open = require('gulp-open');
var nodemon = require('gulp-nodemon');

gulp.task('nodestart', function () {
    nodemon({
        script: 'app.js'
    });
});

gulp.task('open', ['nodestart'], function() {
    gulp.src(__filename) 
        .pipe(open({ uri: 'http://localhost:8000/' }));
});

gulp.task('default', ['nodestart', 'open']);
