terminal = require 'child_process'

run = (command) ->
  terminal.exec command, (err, stdout, stderr) ->
    console.log err or stderr or stdout

run 'make dpr.js test/test.js'

require('watchr').watch
  path: '.'
  listener: (action, path) ->
    if action isnt 'unlink'
      run 'make dpr.js' if path is 'dpr.coffee'
      run 'make test/test.js' if path is 'test/test.coffee'
