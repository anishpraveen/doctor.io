var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("app/dist"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.html","app/style.css"])
        .pipe(gulp.dest("app/dist"));
});

var watch = ['app/dist/css/*css', 
             'app/components/*.jsx', 
             'app/main.jsx',
             'app/*html',
             'app/action/*.js',
             'app/stores/*.js'];
gulp.task('watch',['default'], function() {
    gulp.watch(watch, ['default']);
})

gulp.task("default",["copy"],function(){
   console.log("Gulp completed..."); 
});

// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: 'app/dist'
//     },
//   })
// })

// // watch files for changes and reload
// gulp.task('serve',['browserSync'], function() {

//   gulp.watch(['*.html', 'app/dist/css/*css', 'scripts/**/*.js'], ['default']);
// });