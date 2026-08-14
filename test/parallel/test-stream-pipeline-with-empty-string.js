'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { pipeline, PassThrough } = require('../../lib/ours/index')
async function runTest() {
  await pipeline(
    '',
    new PassThrough({
      objectMode: true
    }),
    common.mustCall()
  )
}
runTest().then(common.mustCall())

