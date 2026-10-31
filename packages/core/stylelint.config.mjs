// Stylelint for the component layer: src/sass/components/**/*.scss.
//
// Components must be written in design tokens (var(--mild-*), or Sass tokens such as
// breakpoints.mild-breakpoint(sm)), never in raw values. Tokens are the only things that are
// allowed to hold literals, and they live in src/sass/tokens/ and the :root block of index.scss,
// which this config does not cover.
//
// Run with: pnpm --filter @mild-ui/core lint:styles   (also part of the root `pnpm lint`)

const px = "px";

export default {
  customSyntax: "postcss-scss",
  rules: {
    // No color literals of any form: hex, rgb()/rgba()/hsl()/hsla(), or named colors such as
    // `white`. Use var(--mild-color-*), including --mild-color-white/black and the
    // --mild-color-{black,white}-alpha-* steps for translucent overlays.
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"],

    // No px literals. Lengths come from var(--mild-space-*), var(--mild-radius-*),
    // var(--mild-border-width) (and calc() multiples of it), var(--mild-outline-width) and
    // var(--mild-ring-offset-width). Zero is written as `0` (length-zero-no-unit).
    "unit-disallowed-list": [
      [px],
      {
        // Agreed exception 1: media-query features. CSS custom properties cannot be used inside
        // @media, so a breakpoint without a Sass token (e.g. 480px) has to stay a literal. Where
        // a token exists, interpolate it: @media (max-width: #{breakpoints.mild-breakpoint(sm)}).
        ignoreMediaFeatureNames: { px: ["min-width", "max-width"] },
      },
    ],
    "length-zero-no-unit": true,
  },
  overrides: [
    {
      // Agreed exception 2: the accordion animates `max-height` open with a "large enough"
      // ceiling (1000px). It is a transition trick, not a design value, and there is no token for
      // it. The exception is limited to that one property in that one file.
      files: ["src/sass/components/_accordion.scss"],
      rules: {
        "unit-disallowed-list": [
          [px],
          {
            ignoreProperties: { px: ["max-height"] },
            ignoreMediaFeatureNames: { px: ["min-width", "max-width"] },
          },
        ],
      },
    },
  ],
};
