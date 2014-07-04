module.exports = function(grunt) {
  'use strict';

  // 實作 copy file 的模型
  grunt.registerMultiTask('fun4', 'fun3 task implement.', function(target) {
    // console.log(this);

    // 使用 Mutitask API
    // ref: http://gruntjs.com/api/inside-tasks
    // 得到 sample.log, sample2.log, fun4.js
    this.files.forEach(function(fp){
      
      // 檢查每一個符合 pattern 的 file path
      // console.log(fp);

      console.log('from ...')
      console.log(fp.src);

      fp.src.forEach(function(i){
        console.log('perfile name: ' + i);
      });

      console.log('copy to...')
      console.log(fp.dest);

      // debugger;

    });
  });

};