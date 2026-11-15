// Loads the built package through its own `exports` map, the way a consumer does.
// Vitest runs against src/, so this is the only check that dist/ actually resolves.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import DefaultImport, { ColorUtils as NamedImport } from 'advanced-color-utils'

const required = createRequire(import.meta.url)('advanced-color-utils')

for (const [label, exported] of [
  ['esm default', DefaultImport],
  ['esm named', NamedImport],
  ['cjs named', required.ColorUtils],
  ['cjs default', required.default],
]) {
  assert.equal(typeof exported?.getComplementaryColor, 'function', `${label} export is not ColorUtils`)
}
assert.equal(DefaultImport.getComplementaryColor('#ff0000'), required.ColorUtils.getComplementaryColor('#ff0000'))
process.stdout.write('dist smoke test passed\n')
