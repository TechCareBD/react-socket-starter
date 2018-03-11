var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');  
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var dist = 'public/';
var src = 'src/client/';
var srcServer = 'src/server/';
var distServer = 'server/';

//compile sources:sass
gulp.task('sass',function(){  
   return gulp.src(src+'styles/styles.scss')
   .pipe(sourcemaps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest(dist));
});

//compile sources:js
//TODO: upgrade this to watchify to enable incremental builds (way faster)
gulp.task('build-js', function() {
  return buildScript(src+'app.js');
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file) {
  var props = {
		entries: [file],
		extensions: ['.js', '.jsx'],
    debug: true,
    cache: {},
    packageCache: {}
	};
  var bundler = browserify(props);
  bundler.transform(babelify, {presets: ['es2015', 'react']})
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', handleErrors)
    .pipe(source('scripts.js'))
    .pipe(gulp.dest(dist));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

//compile sources:server
gulp.task('prepare-server', function() {
  return gulp.src(srcServer+'**/*.js')
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
  .pipe(gulp.dest(distServer));
});

//watch dest to trigger livereload AFTER compilation
gulp.task('html',function(){  
    return gulp.src(dist+'*.html')
    .pipe(livereload());
});

gulp.task('css',function(){  
    return gulp.src(dist+'*.css')
    .pipe(livereload());
});

gulp.task('js',function(){  
    return gulp.src(dist+'*.js')
    .pipe(livereload());
});

//watch register all
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(src+'**/*.scss', ['sass']);
	gulp.watch([src+'**/*.js', src+'**/*.jsx'], ['build-js']);
  gulp.watch([srcServer+'**/*.js', srcServer+'**/*.json'], ['prepare-server']);
	gulp.watch(dist+'*.html', ['html']);
	gulp.watch(dist+'*.css', ['css']);
	gulp.watch(dist+'*.js', ['js']);
});

//build
gulp.task('build', ['sass', 'build-js', 'prepare-server']);

//server
gulp.task('server',function(){  
    nodemon({
        script: distServer + 'server.js',
        watch: [distServer+'/']
    });
});

//default
gulp.task('default', ['build', 'server', 'watch']);
