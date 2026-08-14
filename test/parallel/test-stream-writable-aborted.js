'use strict'

const silentConsole = {
  log() {},
  error() {}
}
require('../common')
const assert = require('assert')
const { Writable } = require('../../lib/ours/index')
{
  const writable = new Writable({
    write() {}
  })
  assert.strictEqual(writable.writableAborted, false)
  writable.destroy()
  assert.strictEqual(writable.writableAborted, true)
}
{
  const writable = new Writable({
    write() {}
  })
  assert.strictEqual(writable.writableAborted, false)
  writable.end()
  writable.destroy()
  assert.strictEqual(writable.writableAborted, true)
}

