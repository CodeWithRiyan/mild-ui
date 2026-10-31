# @mild-ui/tokens

## 1.2.0

## 1.1.0

## 1.0.0

## 0.6.0

### Minor Changes

- New package: the design tokens as JSON.

  - `src/primitives/*.json` and `src/semantics/*.json` hold every value from `@mild-ui/core`'s Sass token maps (colors, typography, spacing, dimensions, elevation, radius, breakpoints, animation), in the Design Tokens Community Group format; semantic tokens reference primitives with `{color.blue.500}`-style aliases.
  - `src/semantics/{light,dark,high-contrast}.json` define the 15 theme roles (`background`, `foreground`, `muted`, `border`, `input`, `ring`, `card`, `popover`, `accent`, `destructive` and their `-foreground` pairs). `scripts/check-contrast.ts` (`pnpm test`) verifies every text and UI pair against WCAG 2.x (4.5:1 / 3:1) and fails on regressions; the light and dark files differ from core's theme SCSS where the original values did not pass, and say so in their `$description`.
  - `pnpm build` runs Style Dictionary and emits `dist/tokens.css` (custom properties), `dist/_tokens.scss` (`$mild-*` variables), `dist/tokens.json` (flat) and `dist/tokens.ts` (`as const`), exported as `./css`, `./scss`, `./json` and `./ts`.
