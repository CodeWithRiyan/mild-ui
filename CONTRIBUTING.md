# Contributing to mild-ui

Thanks for helping out! This guide covers local setup, the checks every PR must pass, and how releases work.

## Local setup

Requirements: Node.js 20, 22, or 24 (Corepack ships with Node.js) and Git.

```bash
git clone https://github.com/CodeWithRiyan/mild-ui.git
cd mild-ui
corepack enable
pnpm install
pnpm build
```

`corepack enable` makes the `pnpm` version pinned in `package.json` (`packageManager`) available. `pnpm install` also installs the Git hooks.

## Repository layout

| Path                  | Contents                                                                           |
| --------------------- | ---------------------------------------------------------------------------------- |
| `packages/core`       | SCSS design system, compiled CSS, and tokens                                       |
| `templates`           | Framework templates (Next.js App Router, Nuxt) that consume the published packages |
| `packages/react`      | `@mild-ui/react` components                                                        |
| `packages/vue`        | `@mild-ui/vue` components                                                          |
| `packages/tokens`     | `@mild-ui/tokens`: design tokens as JSON                                           |
| `packages/primitives` | `@mild-ui/primitives`: headless, accessible UI behaviour                           |
| `examples`            | Runnable theming examples (CSS, SCSS, runtime)                                     |
| `storybook/react`     | React Storybook (`pnpm storybook:react`)                                           |
| `storybook/vue`       | Vue Storybook (`pnpm storybook:vue`)                                               |
| `site`                | Landing page deployed at the root of the docs site, next to both Storybooks        |
| `scripts`             | Repository checks used by CI                                                       |

## Checks

CI runs these on Node 20, 22, and 24. Run them locally before opening a PR:

```bash
pnpm format:check   # Prettier (pnpm format to fix)
pnpm lint           # ESLint, and Stylelint for packages/core/src/sass/components
pnpm typecheck      # TypeScript / vue-tsc (packages, playgrounds and both Storybooks)
pnpm check:storybooks  # the React and Vue Storybooks document the same components
pnpm test           # Vitest
pnpm build          # packages, examples and Storybooks
```

CI also runs `pnpm verify:readme` (every import shown in a README must exist in the built packages), `pnpm check:packages` (publint, attw, tarball contents, the `"use client"` boundary), `pnpm size` and `pnpm size:vue` (per-component gzip budgets, see [`WORKFLOWS.md`](./WORKFLOWS.md#size-budget)), and `pnpm audit --prod`.

Two contracts every React component must keep, both enforced by `pnpm test`:

- **Server rendering + hydration** (`packages/react/src/ssr.test.tsx`): the component renders with `react-dom/server` and hydrates that HTML without a warning. Read browser state in effects, never during render; mount browser-only UI (portals) behind `useHydrated()`.
- **Size budget** (`size-budget.json`): a new component needs a budget line (`pnpm size:update` after building adds it).

And for every Vue component (`pnpm --filter @mild-ui/vue test:coverage`):

- **Behaviour from the primitives**: interactive behaviour comes from `@mild-ui/primitives` through `useMachine`; the package has no other runtime dependency.
- **Tests**: a `*.test.ts` next to the component running the shared `@mild-ui/test-cases`, the WAI-ARIA keyboard contract where there is one, and `itHasNoSeriousAxeViolations` (light and dark theme). Coverage is gated per file at 90% lines, branches, functions and statements.
- **No `any`** in `src/components` and `src/types` (ESLint and `src/no-any.test.ts`, which also scans the React package).
- **Vue versions**: `pnpm test:vue:matrix` runs the suite (and the `apps/playground-vue` smoke + SSR tests) on the committed Vue version and on `vue@latest`.
- **Size budget** (`size-budget.vue.json`): a new component needs a budget line (`pnpm size:update:vue` after building adds it).
- **Playground**: `apps/playground-vue` renders every component on one page; add the new component there (and to `apps/playground-react` for React) so the smoke and SSR tests cover it.
- **Stories**: a `Name.stories.ts` in `storybook/vue` and a `Name.stories.tsx` in `storybook/react` with the same `title`; `pnpm check:storybooks` fails when one side is missing. Interactive components link their WAI-ARIA APG pattern and keyboard test file from the story description.

The pre-commit hook formats staged files with Prettier, runs `eslint --fix` on staged `.ts`, `.tsx`, and `.vue` files, and Stylelint on staged component SCSS; a commit with remaining lint errors is rejected.

## Pull requests

1. Branch from `main`. Direct pushes to `main` are blocked.
2. Keep each PR focused on one task. If it implements a roadmap task, put the task ID (for example `T-R1A-04`) and its acceptance criterion in the PR description.
3. If you change a public package, add a changeset:

   ```bash
   pnpm changeset
   ```

   Pick the affected packages and the bump type (`patch` for fixes, `minor` for features or breaking changes while we are below 1.0) and describe the change for the changelog.

4. Fill in the PR template, including the proof that the change works (CI run, screenshots, logs).

## Releases

Releases are automated with [Changesets](https://github.com/changesets/changesets). Merged changesets accumulate in a "Version Packages" PR; merging that PR publishes `@mild-ui/core`, `@mild-ui/react`, and `@mild-ui/vue` with the same version, npm provenance, changelogs, and a GitHub Release.

## Code of Conduct

By participating you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Security issues go through [SECURITY.md](./SECURITY.md), not public issues.
