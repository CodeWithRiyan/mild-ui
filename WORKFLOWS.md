# GitHub Workflows

| Workflow                                           | Trigger                                  | What it does                                                                                                                                                             |
| -------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`ci.yml`](.github/workflows/ci.yml)               | Every PR, push to `main`                 | `install --frozen-lockfile`, `format:check`, `lint`, `typecheck`, `test`, `build` on Node 18/20/22; README import check, publint/attw/tarball check, `pnpm audit --prod` |
| [`release.yml`](.github/workflows/release.yml)     | Push to `main`, manual                   | Opens the "Version Packages" PR; merging it publishes core, react, and vue with npm provenance and GitHub Releases. Manual runs publish a snapshot to `next`             |
| [`links.yml`](.github/workflows/links.yml)         | PRs touching Markdown, weekly            | Checks every link in `*.md` with lychee (exclusions in [`.lycheeignore`](.lycheeignore))                                                                                 |
| [`scorecard.yml`](.github/workflows/scorecard.yml) | Push to `main`, weekly                   | OpenSSF Scorecard analysis                                                                                                                                               |
| [`storybook.yml`](.github/workflows/storybook.yml) | Push to `main` touching packages/stories | Builds both Storybooks and the core docs and deploys them to GitHub Pages                                                                                                |

All third-party actions are pinned to a commit SHA; Renovate keeps the pins up to date.

## Required secrets

- `NPM_TOKEN`: npm automation token with publish rights for the `@mild-ui` scope (used by `release.yml`).

## Running the CI checks locally

```bash
pnpm install --frozen-lockfile
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm verify:readme && pnpm check:packages
```
