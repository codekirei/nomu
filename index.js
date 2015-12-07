'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const fs = require('fs-extra')
const p = require('path')

// npm
const P = require('bluebird')
const globby = require('globby')

// promisification
P.promisifyAll(fs)

//----------------------------------------------------------
// Internal
//----------------------------------------------------------
function goToRoot() {
  const test = () => globby(p.join(process.cwd(), 'package.json'))
  const loop = () => {process.chdir('../'); return main()}
  const main = () => test().then(arr => !arr.length ? loop() : void 0)
  return main()
}

function generateFileObjects(paths) {
  return P.all(paths.map(path => fs.readFileAsync(path)))
    .then(buffers => buffers.reduce((accum, buffer, i) => {
      accum[paths[i]] = {buffer: buffer}
      return accum
    }, {}))
}

//----------------------------------------------------------
// External
//----------------------------------------------------------
function read(glob, opts) {
  return goToRoot()
    .then(_ => globby(glob, opts))
    .then(generateFileObjects)
}

function write(data) {
  return P.all(Object.keys(data).map(file => {
    fs.outputFileAsync(file, data[file].buffer)
  }))
}

function rename(data, fn) {
  return Object.keys(data).reduce((accum, file) => {
    accum[this(file)] = data[file]
    return accum
  }, {})
}

function debug(data) {
  console.log(data)
  return data
}

module.exports = {read, write, rename, debug}
