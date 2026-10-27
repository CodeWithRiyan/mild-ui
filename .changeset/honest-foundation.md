---
"@mild-ui/core": minor
"@mild-ui/react": minor
"@mild-ui/vue": minor
---

R1A foundation release.

- `@mild-ui/vue` now exports `Checkbox`, `Input`, `Radio`, `RadioGroup`, `Select`, and `ThemeProvider` by name.
- `@mild-ui/react` ships `dist/index.mjs` and `dist/index.cjs` with matching type declarations, includes its compiled CSS (`@mild-ui/react/styles`) again, no longer bundles its dependencies, and supports React 19 as a peer.
- `@mild-ui/vue` adds an `exports` map and no longer bundles its dependencies.
- `@mild-ui/core` no longer ships the unfinished Flutter and React Native outputs (`./flutter*`, `./react-native*` exports, the generator scripts, and the `mobile:*` scripts are removed). mild-ui focuses on React and Vue for now.
- All packages declare `engines.node >= 18` and complete repository metadata.
