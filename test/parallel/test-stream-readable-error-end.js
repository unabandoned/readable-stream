'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { Readable } = require('../../lib/ours/index')
{
  const r = new Readable({
    read() {}
  })
  r.on('end', common.mustNotCall())
  r.on('data', common.mustCall())
  r.on('error', common.mustCall())
  r.push('asd')
  r.push(null)
  r.destroy(new Error('kaboom'))
}

