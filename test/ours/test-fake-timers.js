'use strict'

require('../common')
const assert = require('assert')
const util = require('util')
const fakeTimers = require('@sinonjs/fake-timers')
const Transform = require('../../lib/ours/index').Transform
function MyTransform() {
  Transform.call(this)
}
util.inherits(MyTransform, Transform)
const clock = fakeTimers.install({
  toFake: ['setImmediate', 'nextTick']
})
let stream2DataCalled = false
const stream = new MyTransform()
stream.on('data', function () {
  stream.on('end', function () {
    const stream2 = new MyTransform()
    stream2.on('data', function () {
      stream2.on('end', function () {
        stream2DataCalled = true
      })
      setImmediate(function () {
        stream2.end()
      })
    })
    stream2.emit('data')
  })
  stream.end()
})
stream.emit('data')
clock.runAll()
clock.uninstall()
assert.ok(stream2DataCalled)
