'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const stream = require('../../lib/ours/index')
function testPushArg(val) {
  const readable = new stream.Readable({
    read: () => {}
  })
  readable.on(
    'error',
    common.expectsError({
      code: 'ERR_INVALID_ARG_TYPE',
      name: 'TypeError'
    })
  )
  readable.push(val)
}
testPushArg([])
testPushArg({})
testPushArg(0)
function testUnshiftArg(val) {
  const readable = new stream.Readable({
    read: () => {}
  })
  readable.on(
    'error',
    common.expectsError({
      code: 'ERR_INVALID_ARG_TYPE',
      name: 'TypeError'
    })
  )
  readable.unshift(val)
}
testUnshiftArg([])
testUnshiftArg({})
testUnshiftArg(0)

