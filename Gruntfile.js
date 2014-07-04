'use strict';

module.exports = function (grunt) {

  // config task, Task 的基本屬性設定
  // 以下展示三種寫法
  grunt.initConfig({
    log: {
      options: {
        // Task-level options may go here, overriding task defaults.
        // 這是 grunt 的內定屬性, 不會被當成 Task
      },
      foo: [1, 2, 3],
      bar: 'hello world',
      baz: false,
      test: {
        // 似乎無法包到第三層 grunt log:test:a 只有 log:test 效果, 但是可以取到 target value
        a: [4, 6, 7],
        options: {
          name: 'test level'
          // Sub-Task-level options may go here, overriding task defaults.
        }
      }
    },

    fun1: [
      1, 5, 6
    ],

    fun2: [
      [5, 6],
      [7, 9]
    ],

    compass: {
      dev: {
        options: {
         /* ... */
        outputStyle: 'expanded'
        },
      },
      staging: {
        options: {
          /* ... */
          outputStyle: 'compressed'
        },
      },
    }

  });

  // Task Nested System
  // regist task
  // 每一個 Task 真正要做的事情與註冊的指令命名
  grunt.registerMultiTask('log', 'All do all task in log scope by for-loop.', function(target) {
    
    // grunt log:{task}:{target}
    console.log(target);

    grunt.log.writeln(this.target + ': ' + this.data);

    // Debug
    // console.log(Object.keys(this.data));
    // console.log(Object.keys(this.data.a));
    // console.log(Object.keys(this.data.options));
    // console.log(Object.keys(this));
    // console.log(this.options);

  });

  grunt.registerMultiTask('fun1', '似乎是採用 forEach 方式來運作.', function() {
    console.log(this.data);
  });

  grunt.registerMultiTask('fun2', '驗證運作方式.', function() {
    console.log(this.data);
  });

  grunt.registerTask('fun3', '驗證運作方式.', function(target) {

    // 將被底下的 'fun3:me' 觸發
    console.log(target);

    grunt.task.run('log', 'fun1');

    // 指定方式 Run, 等於執行指令 grunt log:test:a, 所以會 run 上面那一個 Task
    grunt.task.run('log:test:a');

  });

  // Nested task
  // task to do task, grunt deploy 將執行 grunt log 與 grunt fun1
  grunt.registerTask('many', ['log', 'fun1', 'fun3:me']);

  grunt.registerTask('compass', '驗證運作方式.', function(target) {
    console.log(target);
  });

  grunt.registerTask('deploy', ['compass:dev']);
};
