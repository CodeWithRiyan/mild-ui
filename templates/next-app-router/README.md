# mild-ui · Next.js App Router playground

Every `@mild-ui/react` component on one page, rendered by the Next.js **App Router**:
the page is a Server Component, the library is a Client Component boundary, and the result
is server-rendered HTML that hydrates **without a single warning**.

This folder is a template, not a workspace package: it depends on the published
`@mild-ui/react` and needs the npm registry to install, so the monorepo's
`pnpm install --frozen-lockfile` does not touch it.

```bash
cd templates/next-app-router
pnpm install          # or npm / yarn
pnpm dev              # http://localhost:3000
pnpm build            # production build, fails on type errors
```

To run it against the local packages instead of npm, build them first and link:

```bash
pnpm --filter "./packages/*" build            # from the repository root
cd templates/next-app-router
pnpm install
pnpm link ../../packages/react
```

## How the library fits the App Router

- **One import, one boundary.** Every module of `@mild-ui/react` starts with `"use client"`
  (`pnpm check:packages` verifies it). Server Components can render any component; the props
  just have to be serializable. Handlers (`onClose`, `onValueChange`) and hooks (`useToast`,
  `useColorMode`) belong in a Client Component: see [`app/showcase.tsx`](./app/showcase.tsx).
- **Per-component cost.** The package ships one file per module and declares its JavaScript
  side-effect free, so `next build` keeps only what the page imports. `pnpm size` in the
  repository enforces a gzip budget per component ([`size-budget.json`](../../size-budget.json)).
- **No hydration mismatch.** Browser-only UI (dialogs, toast regions) mounts after hydration
  through `useHydrated()`; the theme provider renders the default color mode on the server and
  applies the stored choice after mount. `ColorModeScript` in the layout paints the stored mode
  before hydration, which is why `<html>` carries `suppressHydrationWarning` (the attribute is
  expected to differ). The repository's `ssr.test.tsx` renders every component with
  `react-dom/server` and hydrates the HTML, failing on any warning.

## What to check

1. `pnpm build` succeeds (Server Component page + Client Component showcase).
2. Open the page, open the browser console: no "Hydration failed" / "did not match" message.
3. Toggle dark mode, reload: the mode is applied before the first paint (no flash).
