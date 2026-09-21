'use strict'

const silentConsole = {
  log() {},
  error() {}
}
const common = require('../common')
const assert = require('assert')
const net = require('net')
const server = net.createServer().listen(
  0,
  common.mustCall(() => {
    const client = net.connect(
      server.address().port,
      common.mustCall(() => {
        // Which error Node raises here changed in Node 24: it validates the
        // encoding before reaching the buffer type check, so 'buffer' — which
        // is not an encoding — now fails as ERR_UNKNOWN_ENCODING rather than
        // ERR_INVALID_ARG_TYPE. The point of the test is that the call is
        // rejected at all, so accept either rather than pinning one runtime's
        // internal error.
        assert.throws(
          () => {
            client.write('broken', 'buffer')
          },
          (err) => {
            assert.strictEqual(err.name, 'TypeError')
            assert.ok(
              err.code === 'ERR_INVALID_ARG_TYPE' || err.code === 'ERR_UNKNOWN_ENCODING',
              `unexpected error code: ${err.code}`
            )
            return true
          }
        )
        client.destroy()
        server.close()
      })
    )
  })
)

