# Grunt 使用教學

### Install ENV
    npm install grunt
    npm install grunt-cli

### Run
    grunt log               # run all task by for-loop
    grunt log:foo
    grunt log:test

### package.json
    可以使用這個文件來註冊需要的套件讓 npm install 安裝。
    如果你沒有這個文件就得手動安裝：
        grunt
        grunt-cli

### Debug & set Breakpoint
    node debug node_modules\grunt-cli\bin\grunt deploy
    ref: http://nodejs.org/api/debugger.html

## Basic Tasks ( .registerTask )
    When a basic task is run, Grunt doesn't look at the configuration or environment

## Multi Tasks ( .registerMultiTask )
    When a multi task is run, Grunt looks for a property of the same name in the Grunt configuration. Multi-tasks can have multiple configurations, defined using arbitrarily named "targets.”
