'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const { Readable } = require('../../lib/ours/index')
const EE = require('events').EventEmitter
const oldStream = new EE()
oldStream.pause = () => {}
oldStream.resume = () => {}
{
  new Readable({
    autoDestroy: false,
    destroy: common.mustCall()
  }).wrap(oldStream)
  oldStream.emit('destroy')
}
{
  new Readable({
    autoDestroy: false,
    destroy: common.mustCall()
  }).wrap(oldStream)
  oldStream.emit('close')
}

