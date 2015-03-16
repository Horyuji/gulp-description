# gulp-description [![Build Status](https://travis-ci.org/Horyuji/gulp-description.svg)](https://travis-ci.org/Horyuji/gulp-description)


description...

## Install

```sh
$ npm install --save-dev gulp-description
```


## Usage

```js
var gulp = require('gulp');
var description = require('gulp-description');

gulp.task('help', function () {
	description.help({
    "main":[
      "test1"
    ],
    "description":{
      "test0" : "test0 description",
      "test1" : "test1 description",
      "test2" : "test2 description",
      "test3" : "test3 description",
    }
  });
});
```


## License

MIT ©