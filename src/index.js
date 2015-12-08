'use strict';

const gulp = require('gulp');
const colors = require('chalk');

module.exports = ((opts) => {
  opts = opts || {};

  var pad = '                                        ';
  var taskGetter = {
    init: (conf)=> {
      taskGetter.config = conf;
    },

    maxTaxkNameLength: function() {
      var ret = 0;
      taskGetter.mainTaskList().forEach(function(taskName) {
        ret = (ret < taskName.length) ? taskName.length : ret;
      });

      return ret;
    },

    rightPad: function(taskName, len) {
      return (taskName + pad).substring(0, len);
    },

    mainTaskList: function() {
      return Object.keys(gulp.tasks).sort();
    },

    descriptionList: function() {
      return Object.keys(taskGetter.config.description).sort();
    },

    dependencyTaskList: function(taskName) {
      var subTasks = [];
      var depTasks = gulp.tasks[taskName].dep.sort();
      depTasks.forEach(function(depTask) {
        subTasks.push(depTask);
      });

      return subTasks;
    },

    filterMainTask: function(task) {
      return taskGetter.config.main.indexOf(task) >= 0;
    },

    descriptionMsg: function(taskName) {
      var padnum = taskGetter.maxTaxkNameLength();
      var msg = taskGetter.config.description[taskName];
      var task = taskGetter.rightPad(taskName, padnum);
      if (msg) {
        console.log(colors.blue.bold.underline(task), msg);
      }else {
        console.log(colors.red.bold.underline(task),
          colors.red.bold('No description given! add description message'));
      }
    },

    unDescriptionMsg: function(taskName) {
      var padnum = taskGetter.maxTaxkNameLength();
      var tsk = gulp.tasks[taskName];
      var task = taskGetter.rightPad(taskName, padnum);
      if (!tsk) {
        console.log(colors.red.bold.underline(task),
          colors.red.bold('No task given! remove description message'));
      }
    },
  };

  return {
    help:(conf)=> {
      taskGetter.init(conf);
      console.log(colors.blue.bold(' === Main Task === '));
      taskGetter.mainTaskList()
      .filter(taskGetter.filterMainTask)
      .forEach(taskName=>taskGetter.descriptionMsg(taskName));
    },

    all:(conf)=> {
      taskGetter.init(conf);
      console.log(colors.blue.bold(' === All Task === '));
      taskGetter.mainTaskList().forEach(function(taskName) {
        taskGetter.descriptionMsg(taskName);
      });

      taskGetter.descriptionList().forEach(function(taskName) {
        taskGetter.unDescriptionMsg(taskName);
      });
    },

    dependency:(conf)=> {
      taskGetter.init(conf);
      var padnum = taskGetter.maxTaxkNameLength();
      console.log(colors.blue.bold(' === ependently Task === '));
      taskGetter.mainTaskList().forEach(function(taskName) {
        console.log(colors.blue.bold(taskGetter.rightPad(taskName, padnum)),
        colors.gray(' => '),
        colors.gray('[' + taskGetter.dependencyTaskList(taskName).join(', ') + ']'));
      });
    },
  };
})();
