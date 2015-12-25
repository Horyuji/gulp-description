const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const exec = require('child_process').exec;
const jscs = require('gulp-jscs');
const eslint = require('gulp-eslint');

const config = {
  codes: ['src/*.js', 'test/*.js'],
};

// before very long...
gulp.task('eslint', () => gulp.src(config.codes)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('jscs', () => gulp.src(config.codes)
        .pipe(jscs({fix: false})));

gulp.task('build:src', () => del('lib/*')
    .then(()=> gulp.src('src/index.js')
  		.pipe(babel())
  		.pipe(gulp.dest('lib'))));

gulp.task('build:test', () => del('.tmp/*')
    .then(()=> gulp.src('test/*.js')
  		.pipe(babel())
  		.pipe(gulp.dest('.tmp'))));

gulp.task('build', ['jscs', 'build:src','build:test']);

gulp.task('test', function (cb) {
  exec('node_modules/.bin/mocha .tmp/test.js', (err, stdout, stderr)=> {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
