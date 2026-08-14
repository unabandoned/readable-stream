'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const Readable = require('../../lib/ours/index').Readable
const _read = common.mustCall(function _read(n) {
  this.push(null)
})
const r = new Readable({
  read: _read
})
r.resume()

