'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { Readable } = require('../../lib/ours/index')
const readable = new Readable()
readable.read()
readable.on(
  'error',
  common.expectsError({
    code: 'ERR_METHOD_NOT_IMPLEMENTED',
    name: 'Error',
    message: 'The _read() method is not implemented'
  })
)
readable.on('close', common.mustCall())

