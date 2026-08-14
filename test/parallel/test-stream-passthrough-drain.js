'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const assert = require('assert')
const { PassThrough } = require('../../lib/ours/index')
const pt = new PassThrough({
  highWaterMark: 0
})
pt.on('drain', common.mustCall())
assert(!pt.write('hello1'))
pt.read()
pt.read()

