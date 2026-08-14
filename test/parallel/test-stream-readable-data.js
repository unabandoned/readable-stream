'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { Readable } = require('../../lib/ours/index')
const readable = new Readable({
  read() {}
})
function read() {}
readable.setEncoding('utf8')
readable.on('readable', read)
readable.removeListener('readable', read)
process.nextTick(function () {
  readable.on('data', common.mustCall())
  readable.push('hello')
})

