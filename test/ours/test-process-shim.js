'use strict'

const { test } = require('node:test')
const assert = require('node:assert')
const path = require('node:path')

// Loads lib/internal/shims/process.js with `require('process/')` replaced by
// `fake`, by seeding the require cache - the node:test equivalent of tap's
// t.mock, without adding a dev dependency.
const shimPath = require.resolve('../../lib/internal/shims/process')
const processPath = require.resolve('process/', { paths: [path.dirname(shimPath)] })
function loadShim(fake) {
  const saved = require.cache[processPath]
  delete require.cache[shimPath]
  require.cache[processPath] = { id: processPath, filename: processPath, loaded: true, exports: fake }
  try {
    return require(shimPath)
  } finally {
    delete require.cache[shimPath]
    if (saved) {
      require.cache[processPath] = saved
    } else {
      delete require.cache[processPath]
    }
  }
}

test('unwraps an ES module default export containing the process object', () => {
  const processLike = { nextTick() {} }
  const shimmed = loadShim({ __esModule: true, default: processLike })
  assert.strictEqual(shimmed, processLike)
  assert.strictEqual(typeof shimmed.nextTick, 'function')
})

test('unwraps an ES module process export when default is not process-like', () => {
  const processLike = { nextTick() {} }
  const shimmed = loadShim({ __esModule: true, default: {}, process: processLike })
  assert.strictEqual(shimmed, processLike)
  assert.strictEqual(typeof shimmed.nextTick, 'function')
})

test('returns a plain process-like object unchanged', () => {
  const processLike = { nextTick() {} }
  const shimmed = loadShim(processLike)
  assert.strictEqual(shimmed, processLike)
  assert.strictEqual(typeof shimmed.nextTick, 'function')
})

test('returns an ES module wrapper unchanged when no candidate is process-like', () => {
  const wrapped = { __esModule: true, default: {}, process: {} }
  const shimmed = loadShim(wrapped)
  assert.strictEqual(shimmed, wrapped)
  assert.ok(!('nextTick' in shimmed))
})

test('resolves the real process package to an object with nextTick', () => {
  assert.strictEqual(typeof require(shimPath).nextTick, 'function')
})
