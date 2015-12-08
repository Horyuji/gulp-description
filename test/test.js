'use strict';

var assert = require('assert');
var gulp = require('gulp');
var gulpDipendince = require('../../index');
var stdout = require('test-console').stdout;
var config = {
    main:[
      'test1',
    ],
    description:{
      test0: 'test0 description',
      test1: 'test1 description',
      test2: 'test2 description',
      test3: 'test3 description',
    },
  };

describe('description console test', ()=> {
  before(()=> {
    gulp.task('test1', ()=> {});
    gulp.task('test2', ()=> {});
    gulp.task('test3', ['test4'], ()=> {});
    gulp.task('test4', ['test5', 'test6'], ()=> {});
    gulp.task('test5', ()=> {});
    gulp.task('test6', ()=> {});
  });
  it('should main dipendince', (done)=> {
    var output = stdout.inspectSync(function() {
      gulpDipendince.help(config);
    });

    assert.deepEqual(output, [
      '\u001b[34m\u001b[1m === Main Task === \u001b[22m\u001b[39m\n',
      '\u001b[34m\u001b[1m\u001b[4mtest1\u001b[24m\u001b[22m\u001b[39m test1 description\n',
      ]);
    done();
  });
  it('should all dipendince', (done)=> {
    var output = stdout.inspectSync(function() {
      gulpDipendince.all(config);
    });

    assert.deepEqual(output, [
      '\u001b[34m\u001b[1m === All Task === \u001b[22m\u001b[39m\n',
      '\u001b[34m\u001b[1m\u001b[4mtest1\u001b[24m\u001b[22m\u001b[39m test1 description\n',
      '\u001b[34m\u001b[1m\u001b[4mtest2\u001b[24m\u001b[22m\u001b[39m test2 description\n',
      '\u001b[34m\u001b[1m\u001b[4mtest3\u001b[24m\u001b[22m\u001b[39m test3 description\n',
      '\u001b[31m\u001b[1m\u001b[4mtest4\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo description given! add description message\u001b[22m\u001b[39m\n',
      '\u001b[31m\u001b[1m\u001b[4mtest5\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo description given! add description message\u001b[22m\u001b[39m\n',
      '\u001b[31m\u001b[1m\u001b[4mtest6\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo description given! add description message\u001b[22m\u001b[39m\n',
      '\u001b[31m\u001b[1m\u001b[4mtest0\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo task given! remove description message\u001b[22m\u001b[39m\n',
      ]);
    done();
  });
  it('should dependency list', (done)=> {
    var output = stdout.inspectSync(function() {
      gulpDipendince.dependency(config);
    });

    assert.deepEqual(output, [
      '\u001b[34m\u001b[1m === ependently Task === \u001b[22m\u001b[39m\n',
      '\u001b[34m\u001b[1mtest1\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n',
      '\u001b[34m\u001b[1mtest2\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n',
      '\u001b[34m\u001b[1mtest3\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[test4]\u001b[39m\n',
      '\u001b[34m\u001b[1mtest4\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[test5, test6]\u001b[39m\n',
      '\u001b[34m\u001b[1mtest5\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n',
      '\u001b[34m\u001b[1mtest6\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n',
      ]);
    done();
  });
});
