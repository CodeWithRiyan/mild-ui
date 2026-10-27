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

| Path              | Contents                                     |
| ----------------- | -------------------------------------------- |
| `packages/core`   | SCSS design system, compiled CSS, and tokens |
| `packages/react`  | `@mild-ui/react` components                  |
| `storybook/react` | React Storybook (`pnpm storybook:react`)     |
| `scripts`         | Repository checks used by CI                 |

## Checks

CI runs these on Node 20, 22, and 24. Run them locally before opening a PR:

```bash
pnpm format:check   # Prettier (pnpm format to fix)
pnpm lint           # ESLint
pnpm typecheck      # TypeScript
pnpm test           # Vitest
pnpm build          # packages and Storybooks
```

CI also runs `pnpm verify:readme` (every import shown in a README must exist in the built packages), `pnpm check:packages` (publint, attw, tarball contents), and `pnpm audit --prod`.

The pre-commit hook formats staged files with Prettier and runs `eslint --fix` on staged `.ts` and `.tsx` files; a commit with remaining lint errors is rejected.

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

Releases are automated with [Changesets](https://github.com/changesets/changesets). Merged changesets accumulate in a "Version Packages" PR; merging that PR publishes `@mild-ui/core` and `@mild-ui/react` with the same version, npm provenance, changelogs, and a GitHub Release.

## Code of Conduct

By participating you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Security issues go through [SECURITY.md](./SECURITY.md), not public issues.
