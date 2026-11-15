/* eslint-disable */
const fs = require('fs')
const Path = require('path')
/* eslint-enable */

// Node's ESM loader exposes a CommonJS module as its `module.exports` object and ignores
// `__esModule`, so `import ColorUtils from "advanced-color-utils"` would yield
// `{ ColorUtils, default }` instead of the class. This thin ESM entry re-exports it properly.
const dist = Path.join(__dirname, '../dist')

fs.writeFileSync(
  Path.join(dist, 'ColorUtils.mjs'),
  'import cjs from "./ColorUtils.js";\n\nexport const ColorUtils = cjs.ColorUtils;\nexport default ColorUtils;\n'
)
fs.writeFileSync(
  Path.join(dist, 'ColorUtils.d.mts'),
  'import { ColorUtils } from "./ColorUtils.js";\n\nexport { ColorUtils };\nexport default ColorUtils;\n'
)
