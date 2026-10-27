# Changesets

Every PR that changes a public package (`@mild-ui/core`, `@mild-ui/react`, `@mild-ui/vue`) adds a changeset:

```bash
pnpm changeset
```

The three packages are versioned together (`fixed` in `config.json`), so they always share one version.
