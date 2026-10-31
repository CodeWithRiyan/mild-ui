# site

The landing page published at the root of <https://codewithriyan.github.io/mild-ui/> by
[`storybook.yml`](../.github/workflows/storybook.yml), next to the two Storybooks (`/react/`,
`/vue/`) and the core docs (`/core/`).

It is plain HTML: every component on it is mild-ui markup styled by the core stylesheet
(`assets/mild-ui.min.css` is copied from `packages/core/dist` at deploy time), so the page is a
live sample of the design system rather than a screenshot. `assets/site.css` adds the page
layout on top of the same `--mild-*` tokens; `assets/site.js` drives the dark-mode toggle with
the library's storage key and `<html data-theme>` attribute.

Preview locally:

```bash
pnpm --filter @mild-ui/core build
cp packages/core/dist/mild-ui.min.css site/assets/
npx serve site
```
