'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const fs = require('fs')

// npm
const P = require('bluebird')
const globby = require('globby')

// promisification
P.promisifyAll(fs)

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function src(source, opts) {
  return globby(source, opts)
    .then(readFiles)
}

function readFiles(files) {
  const proms = files.map(file => fs.readFileAsync(file))
  return P.all(proms)
    .then(buffers => buffers.reduce((prev, cur, i) => {
      prev.set(files[i], cur.toString())
      return prev
    }, new Map()))
}

module.exports = {
  src
}
