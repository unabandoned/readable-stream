'use strict'

const silentConsole = {
  log() {},
  error() {}
}
require('../common')
const assert = require('assert')
const { Readable } = require('../../lib/ours/index')
{
  const readable = new Readable({
    encoding: 'hex'
  })
  assert.strictEqual(readable._readableState.encoding, 'hex')
  readable.setEncoding(null)
  assert.strictEqual(readable._readableState.encoding, 'utf8')
}

