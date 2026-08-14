'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { Readable } = require('../../lib/ours/index')

// This test ensures that there will not be an additional empty 'readable'
// event when stream has ended (only 1 event signalling about end)

const r = new Readable({
  read: () => {}
})
r.push(null)
r.on('readable', common.mustCall())
r.on('end', common.mustCall())

