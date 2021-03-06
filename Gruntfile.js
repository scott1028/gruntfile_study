'use strict';

module.exports = function (grunt) {

  // 執行一些 Grunt API 做事情, 例如幫忙建資料夾之類的
  grunt.file.mkdir('test/output');

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

    fun2: {
      //
    },

    // 類似變數宣告
    test_vars: {
      name: 'grunt-contrib-copy',
      version: '0.1.0',
      match: 'folder_one/*'
    },

    fun4: {
      // files: [],     // 不能寫在這層, 違背 Gruntfile 架構
      tesk_job: {
        options: {
          mode: '0444',
        },
        // grunt 內建的 file pattern api
        files: [
          {
            src: ['tmp/*.*'],
            dest: 'test/output/'
          },
          {
            src: ['tasks/*.*'],
            dest: 'test/output<%= test_vars.version %>/'
          }
        ]
      }
    },

    compass: {
      dev: {
        options: {
          /* ... */
          outputStyle: 'expanded'
        }
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

  // When a multi task is run, Grunt looks for a property of the same name in the Grunt configuration
  // Multi Task 會看 Config
  grunt.registerMultiTask('fun1', '似乎是採用 forEach 方式來運作.', function() {
    console.log(this.data);
  });

  // ref: http://gruntjs.com/api/inside-tasks#inside-multi-tasks
  // 在 MultiTask Scope 內提供 Grunt Multi Task API
  grunt.registerMultiTask('fun2', '驗證運作方式.', function() {
    console.log(this.data);

    debugger;
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

  // When a basic task is run, Grunt doesn't look at the configuration or environment
  grunt.registerTask('single', '單層架構 Task Config', function(target){
    console.log(this);
  });

  // basic task 不用參照 grunt config 內的工作
  // When a basic task is run, Grunt doesn't look at the configuration or environment
  grunt.registerTask('anyname', '驗證運作方式.', function(target) {
    console.log(123);
    console.log(target);

    // invoke grunt api
    var tmp = grunt.file.read('./gruntfile.js');

    // 啟用條件, 基本上要 c*2 才會到這個 breakpoint, grunt
    // node debug node_modules\grunt-cli\bin\grunt log
    // debugger;

    // Grunt inside Task Utility
    // ref: http://gruntjs.com/api/inside-tasks#this.files
    // this.name == grunt.task.current.name


  });

  // 可以用 basic task 來呼叫 另一個 task
  grunt.registerTask('deploy', ['anyname:dev']);

  // load tasks folder 內的 Task 文件
  // 寫法參考：https://github.com/gruntjs/grunt-contrib-copy/blob/master/tasks/copy.js
  // 使用 fun4 的 config
  grunt.loadTasks('tasks');
};
