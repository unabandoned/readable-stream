'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const stream = require('../../lib/ours/index')
class Writable extends stream.Writable {
  constructor() {
    super()
    this.prependListener = undefined
  }
  _write(chunk, end, cb) {
    cb()
  }
}
class Readable extends stream.Readable {
  _read() {
    this.push(null)
  }
}
const w = new Writable()
w.on('pipe', common.mustCall())
const r = new Readable()
r.pipe(w)

