const testTicksDisableHook = `
  /* replacement start */
  process.on('beforeExit', (code) => {
    hook.disable();
  });
  /* replacement end */
`

// The suite runs under Node's built-in test runner (node --test), so there is
// no tap reporter footer: node --test derives pass/fail from each file's exit
// code. Only the samecb-singletick test keeps a beforeExit hook to disable its
// async_hooks probe.
export const footers = {
  'test/parallel/test-stream-writable-samecb-singletick.js': testTicksDisableHook
}
