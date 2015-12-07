'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const fs = require('fs')
const p = require('path')

// npm
const P = require('bluebird')
const globby = require('globby')

// promisification
P.promisifyAll(fs)

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function goToRoot() {
  const test = () => globby(p.join(process.cwd(), 'package.json'))
  const loop = () => {process.chdir('../'); return main()}
  const main = () => test().then(arr => !arr.length ? loop() : void 0)
  return main()
}

function buffersToMap(files) {
  const proms = files.map(file => fs.readFileAsync(file))
  return P.all(proms)
    .then(buffers => buffers.reduce((prev, cur, i) => {
      prev.set(files[i], cur)
      return prev
    }, new Map()))
}

function read(glob, opts) {
  return goToRoot()
    .then(_ => globby(glob, opts))
    .then(buffersToMap)
}

function write(map) {
  return P.all(map.forEach((buffer, path) => fs.writeFileAsync(path, buffer)))
}

module.exports = {read, write}
