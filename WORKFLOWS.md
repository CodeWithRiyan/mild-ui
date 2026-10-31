# GitHub Workflows

| Workflow                                           | Trigger                                  | What it does                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`ci.yml`](.github/workflows/ci.yml)               | Every PR, push to `main`                 | `install --frozen-lockfile`, `format:check`, `lint`, `typecheck`, `check:storybooks`, `test` (incl. the SSR + hydration contract), `build` on Node 20/22/24; React 18/19 matrix; Vue current/latest matrix; README import check, publint/attw/tarball/`"use client"` check, per-component size budget (`pnpm size`, `pnpm size:vue`), `pnpm audit --prod` |
| [`release.yml`](.github/workflows/release.yml)     | Push to `main`, manual                   | Opens the "Version Packages" PR; merging it publishes core, react, vue, tokens, and primitives with npm provenance and GitHub Releases. Manual runs publish a snapshot to `next`                                                                                                                                                                          |
| [`links.yml`](.github/workflows/links.yml)         | PRs touching Markdown, weekly            | Checks every link in `*.md` with lychee (exclusions in [`.lycheeignore`](.lycheeignore))                                                                                                                                                                                                                                                                  |
| [`scorecard.yml`](.github/workflows/scorecard.yml) | Push to `main`, weekly                   | OpenSSF Scorecard analysis                                                                                                                                                                                                                                                                                                                                |
| [`storybook.yml`](.github/workflows/storybook.yml) | Push to `main` touching packages/stories | Builds both Storybooks and the core docs, copies the landing page from `site/` and deploys everything to GitHub Pages                                                                                                                                                                                                                                     |

All third-party actions are pinned to a commit SHA; Renovate keeps the pins up to date.

## Required secrets

- `NPM_TOKEN`: npm automation token with publish rights for the `@mild-ui` scope (used by `release.yml`).

## Running the CI checks locally

```bash
pnpm install --frozen-lockfile
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build   # quality job
pnpm test:react:matrix                                                         # React 18 + 19
pnpm test:vue:matrix                                                           # Vue current + latest
pnpm verify:readme && pnpm check:packages && pnpm size && pnpm size:vue        # package checks
pnpm audit --prod --audit-level high
```

## Size budget

`pnpm size` bundles every public export of `@mild-ui/react` on its own (esbuild, tree-shaken,
minified, `react`/`react-dom` external) and compares the gzipped size with
[`size-budget.json`](size-budget.json); the full bundle and the compiled CSS have budgets too.
`pnpm size:vue` does the same for `@mild-ui/vue` (`vue` external) against
[`size-budget.vue.json`](size-budget.vue.json), with the core stylesheet as its CSS line;
`node scripts/size-budget.mjs --package vue --compare` prints the React budget next to each Vue
export. Both packages ship one file per module and mark their JavaScript side-effect free, which
is what lets a consumer's bundler keep only the imported components. A budget that trips means a
component grew (or the tree-shaking broke): shrink it, or raise the budget deliberately with
`pnpm size:update` / `pnpm size:update:vue` (current size + 15% headroom) and say why in the PR.

## Release checklist (1.x)

1. Every PR that changes a public package carries a changeset (`pnpm changeset`).
2. On merge to `main`, `release.yml` opens or updates the **Version Packages** PR
   (`pnpm version-packages`: bumps the fixed group core/react/vue/tokens/primitives together,
   writes the changelogs, removes the consumed changesets).
3. CI must be green on that PR: the same checks as any PR, plus the package job.
4. Merging it runs `pnpm release` (build + `changeset publish`) with npm provenance and creates
   the GitHub Releases from the changelog entries.
5. Verify the tags and `npm view @mild-ui/react version`, then try the
   [Next.js App Router template](templates/next-app-router) against the published version.
