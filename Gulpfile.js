// // Gulpfile.js 
// var gulp = require('gulp')
//   , nodemon = require('gulp-nodemon')
// //   , jshint = require('gulp-jshint')
 
// // gulp.task('lint', function () {
// //   gulp.src('./**/*.js')
// //     .pipe(jshint())
// // })
 
// gulp.task('default', function () {
//   var stream = nodemon({ script: './bin/www'
//           , ext: 'html js'
//           , ignore: ['ignored.js'] })
 
//   stream
//       .on('restart', function () {
//         console.log('restarted!')
//       })
//       .on('crash', function() {
//         console.error('Application has crashed!\n')
//          stream.emit('restart', 10)  // restart the server in 10 seconds 
//       })
// })


"use strict";

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    nodemon     = require('gulp-nodemon'),
    mincss      = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    head        = require('gulp-header'),
    bs          = require('browser-sync').create(),
    cfg         = require('./bin/www'),
    date        = new Date().toLocaleString(),
    src         = {};

/* ---------------------------------- */
src.css = {
    'files': [
        'public/css/style.css',
        'public/css/user.css'
    ],
    'dest': 'public/css/minified',
    'name': 'all.min.css'
};

src.js = {
    'files': [
        'public/js/search.js'
    ],
    'dest': 'public/css/minified',
    'name': 'all.min.js'
};

src.app = {
    'main': 'index.js',
    'files': [
        'app.js',
        './bin/www',
        'Gulpfile.js',
        'libs/*.js'
    ],
    'ignore': [
        '.idea/*',
        'node_modules/*',
        'public/*'
    ]
};

/* ---------------------------------- */
src.css.files.push('!'+src.css.dest+src.css.name);
src.js.files.push('!'+src.js.dest+src.js.name);
src.app.files.push(src.app.main);

gulp.task('css', function () {
    return gulp.src(src.css.files)
        .pipe(mincss())
        .pipe(concat(src.css.name))
        .pipe(head('/* created at '+date+' */'+'\r\n'))
        .pipe(gulp.dest(src.css.dest));
});

gulp.task('js', function () {
    return gulp.src(src.js.files)
        .pipe(concat(src.js.name))
        .pipe(head('/* created at '+date+' */'+'\r\n'))
        .pipe(gulp.dest(src.js.dest));
});

gulp.task('js-uglify', function () {
    return gulp.src(src.js.files)
        .pipe(uglify())
        .pipe(concat(src.js.name))
        .pipe(head('/* created at '+date+' */'+'\r\n'))
        .pipe(gulp.dest(src.js.dest));
});

gulp.task('reload-css', ['css'], function () {
    bs.reload();
});

gulp.task('reload-js', ['js'], function () {
    bs.reload();
});

gulp.task('watch', ['css', 'js'], function () {
    gulp.watch(src.css.files, ['reload-css']);
    gulp.watch(src.js.files, ['reload-js']);
});

gulp.task('build', function () {
   gulp.src('public/js/*.js')
      .pipe(uglify())
      .pipe(head('/* created at '+date+' */'+'\r\n'))
      // .pipe(concat('all.min.js'))
      .pipe(gulp.dest(src.js.dest));
   gulp.src('public/css/*.css')
      .pipe(mincss())
      // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(head('/* created at '+date+' */'+'\r\n'))
      // .pipe(concat('all.min.css'))
      .pipe(gulp.dest(src.css.dest));
});

gulp.task('default', ['watch'], function() {
    var stream = nodemon({
        'script': './bin/www',
        'ext': 'jade js',
        'ignore': src.app.ignore
    })
    stream.on('start', function () {
        setTimeout(function () {
            // if (typeof src.app.bs === 'undefined'){
                src.app.bs = bs.init({proxy: "dental.io:"+3000});
            // } else {
            //     bs.reload();
            // }
        }, 1000);
    }) 
    stream.on('restart', function () {
        console.log('restarted!')
      })
    stream.on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds 
      });
});