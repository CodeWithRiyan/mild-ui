# Example: styling at runtime

Uses the prebuilt stylesheet (`@mild-ui/core/css`) and sets tokens from JavaScript while the page runs. The accent comes from a URL parameter (`?accent=%23e11d48`) or the color picker, and is written to `document.documentElement` as `--mild-color-accent` (plus derived hover/active/soft shades via `color-mix()`). Every primary button, checked control, focus ring and active tab follows it immediately.

```bash
pnpm --filter @mild-ui/example-styling-runtime build
pnpm --filter @mild-ui/example-styling-runtime snapshot   # needs: pnpm exec playwright install chromium
```

`snapshot` serves `dist/`, opens the page with and without `?accent=`, saves `snapshots/default.png` and `snapshots/accent-override.png`, and fails unless the primary button's computed background is the default blue in the first and `rgb(225, 29, 72)` in the second.
