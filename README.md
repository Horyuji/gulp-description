# gulp-description 


description...

## Install

```sh
$ npm install --save-dev gulp-description
```


## Usage

```js
var gulp = require('gulp');
var babel = require('gulp-description');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});
```


## License

MIT ©