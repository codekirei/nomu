'use strict'

const nm = require('../index')

const rename = path => path.replace('test', './dist')

nm.read('test/**/*.js')
  .then(nm.rename.bind(rename))
  .then(nm.debug)
  .then(nm.write)
