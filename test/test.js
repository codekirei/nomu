'use strict'

const nomu = require('../index')

// function rename(map) {
//   // const temp = new Map()
//   return Map(map.forEach((val, key) => {
//     map.set(key.replace('test', 'dist'), val)
//   }))
//   // return temp
// }

nomu.read('test/**/*.js')
  .then(console.log)
