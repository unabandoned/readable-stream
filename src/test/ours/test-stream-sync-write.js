'use strict'

require('../common')
const assert = require('assert')
const util = require('util')
const stream = require('../../lib/ours/index')
const WritableStream = stream.Writable


const InternalStream = function () {
  WritableStream.call(this)
}
util.inherits(InternalStream, WritableStream)

let invocations = 0
InternalStream.prototype._write = function (chunk, encoding, callback) {
  callback()
}

const internalStream = new InternalStream()

const ExternalStream = function (writable) {
  this._writable = writable
  WritableStream.call(this)
}
util.inherits(ExternalStream, WritableStream)

ExternalStream.prototype._write = function (chunk, encoding, callback) {
  this._writable.write(chunk, encoding, callback)
}

const externalStream = new ExternalStream(internalStream)

for (let i = 0; i < 2000; i++) {
  externalStream.write(i.toString(), () => {
    invocations++
  })
}

externalStream.end()
externalStream.on('finish', () => {
  assert.strictEqual(invocations, 2000)
})
