# Changesets

Every PR that changes a public package (`@mild-ui/core`, `@mild-ui/react`, `@mild-ui/vue`, `@mild-ui/tokens`, `@mild-ui/primitives`) adds a changeset:

```bash
pnpm changeset
```

The five packages are versioned together (`fixed` in `config.json`), so they always share one version.
