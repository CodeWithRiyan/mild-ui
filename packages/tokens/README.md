# @mild-ui/tokens

Design tokens for [mild-ui](https://github.com/CodeWithRiyan/mild-ui) as plain JSON. They hold the same values as the SCSS tokens in `@mild-ui/core`, so tools that don't read Sass (Style Dictionary, Figma plugins, JS theming, docs) can use them.

```bash
npm install @mild-ui/tokens
```

## Layers

| Layer        | Path               | What it holds                                                           |
| ------------ | ------------------ | ----------------------------------------------------------------------- |
| `primitives` | `src/primitives/*` | Raw values: palettes, spacing, type scale, radius, shadows, motion      |
| `semantics`  | `src/semantics/*`  | Named roles that point at primitives (`primary`, `danger`, transitions) |
| `components` | `src/components/*` | Per-component tokens (none yet, so not exported)                        |

| File                      | Top-level groups                                                                                                                                                            |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primitives/colors`       | `color.{blue,gray,red,green,yellow}.{50…950}`                                                                                                                               |
| `primitives/typography`   | `font.family`, `font.size`, `font.weight`, `line-height`, `letter-spacing`                                                                                                  |
| `primitives/spacing`      | `space`, `space-base`                                                                                                                                                       |
| `primitives/dimensions`   | `dimension` (fractional widths such as `1-2` = `50%`)                                                                                                                       |
| `primitives/elevation`    | `shadow`                                                                                                                                                                    |
| `primitives/radius`       | `radius`                                                                                                                                                                    |
| `primitives/breakpoints`  | `breakpoint`                                                                                                                                                                |
| `primitives/animation`    | `duration`, `easing`                                                                                                                                                        |
| `semantics/colors`        | `color.{primary,secondary,success,warning,danger,error}.{50…950}`                                                                                                           |
| `semantics/animation`     | `transition`                                                                                                                                                                |
| `semantics/light`         | `background`, `foreground`, `muted(-foreground)`, `border`, `input`, `ring`, `card(-foreground)`, `popover(-foreground)`, `accent(-foreground)`, `destructive(-foreground)` |
| `semantics/dark`          | Same roles as `semantics/light`                                                                                                                                             |
| `semantics/high-contrast` | Same roles as `semantics/light`                                                                                                                                             |

## Format

The files use the [Design Tokens Community Group](https://www.designtokens.org/) layout. Every token is an object with a `$value`. Groups can set `$type` and `$description`, and the tokens inside a group inherit its `$type`.

```json
{
  "color": {
    "blue": {
      "$type": "color",
      "500": { "$value": "#0ea5e9" }
    }
  }
}
```

Values are CSS strings as `@mild-ui/core` emits them (`"0.25rem"`, `"150ms"`, `"cubic-bezier(0.4, 0, 0.2, 1)"`). There are two exceptions: font weights and line heights are numbers, and font families are arrays. Shadows, easings, transitions and percentage dimensions are plain CSS strings, so they have no `$type`.

Semantic tokens refer to primitives with `{group.path}` references. A semantic file has to be resolved together with the primitives it refers to:

```json
{ "color": { "primary": { "500": { "$value": "{color.blue.500}" } } } }
```

```json
{ "transition": { "colors": { "$value": "color {duration.150} {easing.in-out}" } } }
```

## Usage

Each file is exported without its `.json` extension:

```js
import colors from "@mild-ui/tokens/primitives/colors" with { type: "json" };

colors.color.blue[500].$value; // "#0ea5e9"
```

With Style Dictionary, point `source` at the package so references are resolved across layers:

```js
export default {
  source: ["node_modules/@mild-ui/tokens/src/**/*.json"],
  platforms: {
    css: { transformGroup: "css", files: [{ destination: "tokens.css", format: "css/variables" }] },
  },
};
```

## Build

`pnpm build` runs [Style Dictionary](https://styledictionary.com/) (`style-dictionary.config.mjs`) over `src/**/*.json` and writes:

| File                | Contents                                                                                |
| ------------------- | --------------------------------------------------------------------------------------- |
| `dist/tokens.css`   | CSS custom properties (`--mild-*`), aliases as `var(...)`                               |
| `dist/_tokens.scss` | The same variables as Sass (`$mild-*`, `!default`), importable by `@mild-ui/core`       |
| `dist/tokens.json`  | The same values, flattened to `{ "mild-color-primary-500": "#0ea5e9", ... }`            |
| `dist/tokens.ts`    | The same values, nested like the source JSON, as `export const tokens = {...} as const` |

All four are generated from the same resolved tokens, so `--mild-color-primary-500`, `mild-color-primary-500` and `tokens.color.primary["500"]` are always the same value. One cosmetic difference: Style Dictionary quotes multi-word font names (`'Segoe UI'`), `@mild-ui/core`'s own Sass build does not; both are valid CSS.

These exports resolve to the built files:

```js
import "@mild-ui/tokens/css"; // dist/tokens.css
import tokens from "@mild-ui/tokens/json"; // dist/tokens.json
import { tokens } from "@mild-ui/tokens/ts"; // dist/tokens.ts
```

```scss
@use "@mild-ui/tokens/scss" as tokens; // dist/_tokens.scss
```

## Themes and contrast

`src/semantics/{light,dark,high-contrast}.json` each define the same 15 roles (`background`, `foreground`, `muted`, `muted-foreground`, `border`, `input`, `ring`, `card`, `card-foreground`, `popover`, `popover-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`). `light.json` and `dark.json` mirror `packages/core/src/sass/themes/{light,dark}.scss`; `high-contrast.json` is new. They are parallel, self-contained token sets, not merged with each other (they all define the same keys, e.g. `background`) or built by `style-dictionary.config.mjs` yet.

`scripts/check-contrast.ts` checks, in every theme, the pairs a UI actually renders text or a boundary on:

| Pair                                     | Kind | Minimum (WCAG)         |
| ---------------------------------------- | ---- | ---------------------- |
| `foreground` / `background`              | text | 4.5:1 (1.4.3 AA)       |
| `muted-foreground` / `background`        | text | 4.5:1                  |
| `muted-foreground` / `muted`             | text | 4.5:1                  |
| `card-foreground` / `card`               | text | 4.5:1                  |
| `popover-foreground` / `popover`         | text | 4.5:1                  |
| `accent-foreground` / `accent`           | text | 4.5:1                  |
| `destructive-foreground` / `destructive` | text | 4.5:1                  |
| `border` / `background`                  | ui   | 3:1 (1.4.11, non-text) |
| `input` / `background`                   | ui   | 3:1                    |
| `ring` / `background`                    | ui   | 3:1                    |

Run it with `pnpm --filter @mild-ui/tokens test` (or `pnpm test` from the repo root, which runs every package's `test` script). It resolves every `{color...}` reference, computes the WCAG contrast ratio for all 10 pairs in all 3 themes, prints each ratio against its required minimum (and whether it also clears the AAA 7:1 bar for text), and exits non-zero if anything is below its minimum. A few of the values in `light.json`/`dark.json` are intentionally different from `@mild-ui/core`'s current theme SCSS, because the original values don't pass; each changed token's `$description` says what changed and why, and links back to this check.

## Naming differences from `@mild-ui/core`

Most token paths match the CSS custom property names in `@mild-ui/core` (`color.blue.500` is `--mild-color-blue-500`). The exception is `dimension.*`. Core emits these as `--mild-space-*`, the same prefix as the spacing scale. Here they get their own group so they don't collide with `space.1-5`, `space.2-5` and `space.3-5`.

## License

MIT
