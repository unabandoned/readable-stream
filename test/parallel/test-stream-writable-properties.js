'use strict'

const silentConsole = {
  log() {},
  error() {}
}
require('../common')
const assert = require('assert')
const { Writable } = require('../../lib/ours/index')
{
  const w = new Writable()
  assert.strictEqual(w.writableCorked, 0)
  w.uncork()
  assert.strictEqual(w.writableCorked, 0)
  w.cork()
  assert.strictEqual(w.writableCorked, 1)
  w.cork()
  assert.strictEqual(w.writableCorked, 2)
  w.uncork()
  assert.strictEqual(w.writableCorked, 1)
  w.uncork()
  assert.strictEqual(w.writableCorked, 0)
  w.uncork()
  assert.strictEqual(w.writableCorked, 0)
}

