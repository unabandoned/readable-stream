'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { pipeline, Duplex, PassThrough } = require('../../lib/ours/index')
const assert = require('assert')
const remote = new PassThrough()
const local = new Duplex({
  read() {},
  write(chunk, enc, callback) {
    callback()
  }
})
pipeline(
  remote,
  local,
  remote,
  common.mustCall((err) => {
    assert.strictEqual(err.code, 'ERR_STREAM_PREMATURE_CLOSE')
  })
)
setImmediate(() => {
  remote.end()
})

