# Changesets

Every PR that changes a public package (`@mild-ui/core`, `@mild-ui/react`) adds a changeset:

```bash
pnpm changeset
```

The two packages are versioned together (`fixed` in `config.json`), so they always share one version.
