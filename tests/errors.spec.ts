import test from 'ava';
import { rollup } from 'rollup';
import type { RollupError } from 'rollup';
import { oxcTransform } from '../src/index';

/**
 * Remove current process CWD from the input string.
 * This avoids local machine absolute path to be used in CI / other dev environments.
 */
const replacePWDPath = (input: string): string =>
  input.replaceAll(process.cwd(), '###');

test('should throw error with source having a syntax error', async (t) => {
  const error: RollupError = await t.throwsAsync(
    rollup({
      input: 'tests/fixtures/errors/syntax-error.js',
      plugins: [oxcTransform()],
    }),
  );

  t.is(error.code, 'PLUGIN_ERROR');
  t.is(error.pluginCode, 'ERR_TRANSFORM');
  t.is(error.plugin, 'rollup-plugin-oxc-transform');
  t.snapshot(
    replacePWDPath(error.message),
    'should contain oxc transform error message',
  );
});
