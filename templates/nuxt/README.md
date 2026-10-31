# mild-ui · Nuxt playground

Every `@mild-ui/vue` component on one page, rendered by **Nuxt**: the page is server-rendered
to HTML and hydrates in the browser **without a single warning**.

This folder is a template, not a workspace package: it depends on the published `@mild-ui/vue`
and `@mild-ui/core` and needs the npm registry to install, so the monorepo's
`pnpm install --frozen-lockfile` does not touch it.

```bash
cd templates/nuxt
pnpm install          # or npm / yarn (runs `nuxt prepare`)
pnpm dev              # http://localhost:3000
pnpm build            # production build, fails on type errors
```

To run it against the local packages instead of npm, build them first and link:

```bash
pnpm --filter "./packages/*" build            # from the repository root
cd templates/nuxt
pnpm install
pnpm link ../../packages/vue
pnpm link ../../packages/core
```

## How the library fits Nuxt

- **One stylesheet.** `nuxt.config.ts` lists `@mild-ui/core/mild-ui.css` under `css`, so every
  page gets the design system once. The Vue package itself ships no CSS.
- **Color mode before the first paint.** `getColorModeScript()` from `@mild-ui/vue` is inlined
  into `<head>` through `app.head.script`, so the stored mode (`data-theme` on `<html>`) is
  applied before hydration and nothing flashes. `ThemeProvider` then takes over in the browser; it
  renders the default mode on the server and reads the stored choice after mount, and `<html>`
  is outside the Vue app, so there is nothing to mismatch.
- **No hydration mismatch.** Browser-only UI (dialogs, toast regions) renders through
  `<Teleport to="body">` after mount, so it is not part of the server HTML. The repository's
  `packages/vue/src/ssr.test.ts` renders every component with `vue/server-renderer`, and
  `apps/playground-vue/src/App.ssr.test.ts` hydrates a whole page from that HTML, failing on any
  warning.
- **Per-component cost.** The package ships one file per module and declares its JavaScript
  side-effect free, so `nuxt build` keeps only what the page imports. `pnpm size:vue` in the
  repository enforces a gzip budget per component
  ([`size-budget.vue.json`](../../size-budget.vue.json)).
- **Auto-imports.** `app/components/Showcase.vue` is picked up by Nuxt's component auto-import;
  the library components are imported explicitly from `@mild-ui/vue` (named imports keep the
  bundle tree-shakeable and the types exact).

## What to check

1. `pnpm build` succeeds (`nuxt typecheck` runs as part of it).
2. Open the page, open the browser console: no "Hydration" mismatch message.
3. Toggle dark mode, reload: the mode is applied before the first paint (no flash).
