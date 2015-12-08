'use strict'

const nm = require('../index')
const co = require('co')

const rename = path => path.replace('test', './dist')

// function* main() {
//   const data = yield nm.read('test/**/*.js')
//     .then(nm.debug)
//   console.log(data)
// }

function main() {
  nm.read('test/**/*.js')
    .then(console.log)
}

co(main())

// nm.read('test/**/*.js')
//   .then(nm.rename.bind(rename))
//   .then(nm.debug)
//   .then(nm.write)
