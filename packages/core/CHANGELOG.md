# @mild-ui/core

## 0.5.1

### Patch Changes

- 4cf76b4: Supported Node.js versions are now 20, 22, and 24 (`engines.node`: `^20.0.0 || ^22.0.0 || >=24.0.0`). Node 18 reached end-of-life in April 2025 and is no longer tested. The published code and runtime dependencies are unchanged.

## 0.5.0

### Minor Changes

- 85402d2: R1A foundation release.

  - `@mild-ui/vue` now exports `Checkbox`, `Input`, `Radio`, `RadioGroup`, `Select`, and `ThemeProvider` by name.
  - `@mild-ui/react` ships `dist/index.mjs` and `dist/index.cjs` with matching type declarations, includes its compiled CSS (`@mild-ui/react/styles`) again, no longer bundles its dependencies, and supports React 19 as a peer.
  - `@mild-ui/vue` adds an `exports` map and no longer bundles its dependencies.
  - `@mild-ui/core` no longer ships the unfinished Flutter and React Native outputs (`./flutter*`, `./react-native*` exports removed).
  - All packages declare `engines.node >= 18` and complete repository metadata.
