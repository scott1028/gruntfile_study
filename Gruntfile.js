'use strict';

module.exports = function (grunt) {

  // config task
  grunt.initConfig({
    log: {
      foo: [1, 2, 3],
      bar: 'hello world',
      baz: false
    }
  });

  // regist task
  grunt.registerMultiTask('log', 'All do all task in log scope by for-loop.', function() {
    // 兩個相同意思
    grunt.log.writeln(this.target + ': ' + this.data);
    console.log(this.target + ': ' + this.data);
  });

};
