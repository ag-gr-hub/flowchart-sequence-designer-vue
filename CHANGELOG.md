# Changelog

## 0.1.7 (2026-08-24)

### Maintenance

- Updated dev dependencies to latest within range: vue-tsc 3.3.10

_No changes to shipped runtime code or public API; `src/` is identical to 0.1.6._

## 0.1.6 (2026-08-09)

### Security

- Patched 3 high-severity advisories across **both** lockfiles (root and `demo/`): `brace-expansion`, `nanoid`, `postcss` — `npm audit` now reports 0 vulnerabilities in each

### Maintenance

- Updated dev dependencies to latest within range: eslint 10.8.1, happy-dom 20.11.2, react/react-dom 19.2.8, @types/react 19.2.18, vite 8.2.1, vitest 4.1.10, vue 3.5.41, vue-tsc 3.3.9, @vue/test-utils 2.4.11

_No changes to shipped runtime code or public API; `src/` is identical to 0.1.5._

## 0.1.5 (2026-06-27)

### Maintenance

- Updated dev dependencies to latest within range: vite 8.1.0, vitest 4.1.9, vue 3.5.39, vue-tsc 3.3.5, @vue/test-utils 2.4.11, eslint 10.6.0, happy-dom 20.10.6, react/react-dom 19.2.7, @types/react 19.2.17
- Resolved all open security advisories (esbuild, vite, ws) — 0 vulnerabilities across both lockfiles; pinned esbuild to ^0.28.1 via overrides
- Bumped GitHub Actions: `actions/checkout` v4 → v7, `actions/configure-pages` v5 → v6
- Added missing `@eslint/js` devDependency (lint config failed to load without it)

### Docs

- Use `<pre>` for code blocks in the demo docs to preserve whitespace

_No changes to shipped runtime code or public API; `src/` is identical to 0.1.4._

## 0.1.4 (2026-05-20)

### Maintenance

- Version bump to validate the npm publish pipeline

## 0.1.3 (2026-05-20)

### Fixes

- Import `DiagramModel` from the main package instead of the `/ui` subpath
- Load the correct preset examples when switching tabs
- Responsive layout and accessibility improvements for the demo
- CI/Pages workflow adjustments (configure-pages, cache-dependency-path)

### Maintenance

- Add Dependabot config, issue templates, and package metadata
- Merge initial Dependabot dependency/action updates

## 0.1.2 (2026-05-19)

### Maintenance

- Version bump to test the CI publish flow

## 0.1.1 (2026-05-19)

### Docs

- Rewrite README to match the Angular/React wrapper structure
- Rewrite the demo DocsTab for layout parity

### Fixes

- CI workflow action references and demo build issues

## 0.1.0 (Initial Release)

### Features

- `<FsdDiagram>` component for flowchart/question-flow/journey-map editing
- `<FsdSequence>` component for sequence diagram editing
- `<FsdToolbar>` component for export/import controls
- `<FsdStepEditor>` component for node property editing
- Full v-model support (`v-model` on diagram/sequence components)
- TypeScript support with full type definitions
- Tree-shakeable ESM + CJS dual output
- Lazy-loaded React bridge (code-split editor)
- Light/dark theme support with customizable colors
