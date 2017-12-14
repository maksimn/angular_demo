var gulp = require('gulp');
var open = require('gulp-open');
var nodemon = require('gulp-nodemon');
var gutil = require("gulp-util");
var tslint = require("gulp-tslint");
var webpack = require("webpack");
var webpackConfig = require('./webpack.config');

gulp.task("webpack", function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }
        
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('nodestart', ['webpack'], function () {
    nodemon({
        script: 'dist/app.js'
    });
});

gulp.task('open', ['nodestart'], function() {
    gulp.src(__filename) 
        .pipe(open({ uri: 'http://localhost:8000/' }));
});

gulp.task("tslint", () =>
   gulp.src('src/**/*.ts')
       .pipe(tslint({
           formatter: "verbose"
       }))
       .pipe(tslint.report())
);

gulp.task('default', ['webpack', 'nodestart', 'open', 'tslint']);
