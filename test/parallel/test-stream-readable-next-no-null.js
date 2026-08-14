'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const { mustNotCall, expectsError } = require('../common')
const { Readable } = require('../../lib/ours/index')
async function* generate() {
  yield null
}
const stream = Readable.from(generate())
stream.on(
  'error',
  expectsError({
    code: 'ERR_STREAM_NULL_VALUES',
    name: 'TypeError',
    message: 'May not write null values to stream'
  })
)
stream.on('data', mustNotCall())
stream.on('end', mustNotCall())

