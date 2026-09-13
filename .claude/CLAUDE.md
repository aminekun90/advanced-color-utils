# advanced-color-utils — Claude Context

## Project Overview
TypeScript library for color manipulation: HEX/LAB/RGB conversion, distinct-palette
generation, blending and color-diff. Public, MIT-adjacent OSS, 1★.

**Published under two identities from the same tag:**
- npmjs.com as **`advanced-color-utils`** (unscoped, `publishConfig.access: public`, with
  `--provenance` via OIDC)
- GitHub Packages as the `@aminekun90` scope — this is what `.npmrc` points at locally

Current version: **1.0.10**. `engines`: node `>=22.21.1`, npm `>=10.9.4`. `.nvmrc` is
`lts/jod` (Node 22), but the suite builds and passes on Node 24 too.

## Tech Stack
- **Language:** TypeScript → `tsc` only, no bundler. Output `dist/`, entry
  `dist/ColorUtils.js` + `dist/ColorUtils.d.ts`, `files: ["dist"]`
- **Testing:** Vitest (`globals: true`, node env, v8 coverage, `dist/**` excluded)
- **Runtime deps:** `chroma-js`, `color-diff`, `tslog`

## Key Files
| File | Purpose |
|------|---------|
| `src/ColorUtils.ts` | Library entry point — everything public lives here |
| `src/helper/generateColor.ts` | Palette generation internals |
| `src/decorators/LogPerf.ts` | `@LogPerf` timing decorator, logs through tslog |
| `src/types.ts` | Shared types |
| `src/__tests__/ColorUtils.test.ts` | The whole suite (21 tests) |
| `tools/packagejson.js` | Mutates `package.json` from CLI arg pairs — used by CI |
| `tools/cleanup.js` | Recursive delete, hard-restricted to `dist/` |
| `shai-hulud-audit.sh` | Supply-chain audit script, also runs on CI runners |

## Traps — read before touching this repo

**CI installs with yarn, the scripts run under npm.** `publish.yml` does
`yarn install --frozen-lockfile`, so **`yarn.lock` is the authoritative lockfile** — there
is no `package-lock.json` and no `packageManager` field. Running `npm install` here will
silently resolve different versions than CI. Use `yarn install --frozen-lockfile` to
reproduce a CI failure; `npm run <script>` is fine for running things.

**`npm test` output is drowned in logs.** The `@LogPerf` decorator emits a tslog INFO line
for every call, so the middle of the output is noise. Read only the last block:
`Test Files N passed` / `Tests N passed`. As of this writing: **21 tests, 1 file, green.**

**Publishing is tag-driven, never manual.** Pushing a `v*` tag runs `publish.yml`, which
creates the GitHub release, builds, publishes to npmjs with `--provenance`, then publishes
again to GitHub Packages. Do not run `npm publish` by hand — you would ship without
provenance and desync the two registries. The workflow force-installs `npm@^11.5.1`
because **OIDC provenance needs npm ≥ 11.5.1**; the `engines` floor of 10.9.4 is for
consumers, not for publishing.

**`npm view @aminekun90/advanced-color-utils` returns 401, and that is normal** — `.npmrc`
routes the scope to `npm.pkg.github.com`, which needs a token. The public package to query
is the unscoped `advanced-color-utils`.

**`dist/` is gitignored** (twice, plus `build`). Never commit build output; never
hand-edit `dist/` — `npm run build` overwrites it.

**There is no lint script** despite `.prettierrc` being present. Don't tell the user to run
`npm run lint`; it does not exist.

## Commands (all verified)
```bash
npm test              # vitest run — 21 tests, ~130 ms
npm run test:cov      # + v8 coverage (text/json/html)
npm run test:watch    # watch mode
npm run test:ui       # vitest UI
npm run build         # tsc → dist/  (silent on success, exit 0)
npm run pack          # npm pack, produces a .tgz (gitignored)
npm start             # ts-node runner on src/index.ts

npm test -- ColorUtils   # single file by name filter
```

## Conventions
- **No `console.log`** — log through `tslog`
- Strict TypeScript; explicit return types on every export
- Declaration files ship with every build — consumers depend on the types
- Every public function gets a test; coverage tracked with v8
- SemVer: patch for fixes, minor for new utils, major for API breaks

## CI
| Workflow | Trigger | Role |
|---|---|---|
| `test.yml` | PR | test gate |
| `publish.yml` | push `v*` tag, or manual | release + dual publish |
| `manual-post-release.yml` | manual | re-sync a GitHub release after the fact |
