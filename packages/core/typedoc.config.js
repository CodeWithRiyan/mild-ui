// packages/core/typedoc.config.js
module.exports = {
    entryPoints: ['src/index.ts'],
    out: 'docs/api',
    name: 'mild-ui Core API',
    includeVersion: true,
    excludePrivate: true,
    excludeProtected: true,
    excludeInternal: true,
    readme: 'README.md',
    plugin: ['typedoc-plugin-markdown'],
    theme: 'default',
    validation: {
      notExported: true,
      invalidLink: true,
      notDocumented: false
    }
  };