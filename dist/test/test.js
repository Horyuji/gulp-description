"use strict";

var assert = require("assert");
var gulp = require("gulp");
var gulpDipendince = require("../lib/index");
var stdout = require("test-console").stdout;
var config = {
  main: ["test1"],
  description: {
    test0: "test0 description",
    test1: "test1 description",
    test2: "test2 description",
    test3: "test3 description" }
};

describe("", function () {
  before(function () {
    gulp.task("test1", function () {});
    gulp.task("test2", function () {});
    gulp.task("test3", ["test4"], function () {});
    gulp.task("test4", ["test5", "test6"], function () {});
    gulp.task("test5", function () {});
    gulp.task("test6", function () {});
  });
  it("should main dipendince", function (done) {
    gulpDipendince.help(config);
    var output = stdout.inspectSync(function () {
      gulpDipendince.help(config);
    });
    console.log(output);
    assert.deepEqual(output, ["\u001b[34m\u001b[1m === Main Task === \u001b[22m\u001b[39m\n", "\u001b[34m\u001b[1m\u001b[4mtest1\u001b[24m\u001b[22m\u001b[39m test1 description\n"]);
    done();
  });
  it("should all dipendince", function (done) {
    var output = stdout.inspectSync(function () {
      gulpDipendince.all(config);
    });
    assert.deepEqual(output, ["\u001b[34m\u001b[1m === All Task === \u001b[22m\u001b[39m\n", "\u001b[34m\u001b[1m\u001b[4mtest1\u001b[24m\u001b[22m\u001b[39m test1 description\n", "\u001b[34m\u001b[1m\u001b[4mtest2\u001b[24m\u001b[22m\u001b[39m test2 description\n", "\u001b[34m\u001b[1m\u001b[4mtest3\u001b[24m\u001b[22m\u001b[39m test3 description\n", "\u001b[31m\u001b[1m\u001b[4mtest4\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo description given! add description to gulp/taskDescription.json\u001b[22m\u001b[39m\n", "\u001b[31m\u001b[1m\u001b[4mtest5\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo description given! add description to gulp/taskDescription.json\u001b[22m\u001b[39m\n", "\u001b[31m\u001b[1m\u001b[4mtest6\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo description given! add description to gulp/taskDescription.json\u001b[22m\u001b[39m\n", "\u001b[31m\u001b[1m\u001b[4mtest0\u001b[24m\u001b[22m\u001b[39m \u001b[31m\u001b[1mNo task given! remove description to gulp/taskDescription.json\u001b[22m\u001b[39m\n"]);
    done();
  });
  it("should dependency list", function (done) {
    var output = stdout.inspectSync(function () {
      gulpDipendince.dependency(config);
    });
    assert.deepEqual(output, ["\u001b[34m\u001b[1m === ependently Task === \u001b[22m\u001b[39m\n", "\u001b[34m\u001b[1mtest1\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n", "\u001b[34m\u001b[1mtest2\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n", "\u001b[34m\u001b[1mtest3\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[test4]\u001b[39m\n", "\u001b[34m\u001b[1mtest4\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[test5, test6]\u001b[39m\n", "\u001b[34m\u001b[1mtest5\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n", "\u001b[34m\u001b[1mtest6\u001b[22m\u001b[39m \u001b[90m => \u001b[39m \u001b[90m[]\u001b[39m\n"]);
    done();
  });
});