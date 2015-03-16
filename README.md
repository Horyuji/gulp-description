# gulp-description [![Build Status](https://travis-ci.org/Horyuji/gulp-description.svg)](https://travis-ci.org/Horyuji/gulp-description)


it gulp help setting. the detail description for gulp all task.

## Install

```sh
$ npm install --save-dev gulp-description
```

## Usage

```js

var gulp = require('gulp');
var gulpDep = require('gulp-description');

gulp.task('help', function () {
  gulpDep.help({
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

### description config setting

```json
{
  "main":[
    "help",
    "serve"
  ],
  "description":{
    "default" : "run gulp serve task.",
    "help" :  "view help",
    "serve" : "start livereload development.",
    "watch" : "subtask is livereload file watching",
    "build" : "altJs and sass compile."
  }
}
```

#### main

gulp main task list

#### description

all gulp task description

### gulp task description is main only

```javascript
  gulp.task('help',function(){
    gulpDep.help(require('./taskDescription.json'));
  });

```

### all gulp task description

```javascript

  gulp.task('h:list',function(){
    gulpDep.all(require('./taskDescription.json'));
  });

```

### gulp task dependency state

```javascript

  gulp.task('h:dep',function(){
    gulpDep.dependency(require('./taskDescription.json'));
  });

```

## License

MIT © M.Sakamaki
