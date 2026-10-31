// packages/vue/src/types/aspect-ratio.ts
// AspectRatio component types.

/** `16 / 9` (a number) or `"16/9"` (a CSS ratio string). */
export type AspectRatioValue = number | `${number}/${number}`;

export interface AspectRatioCoreProps {
  /** Width / height. Default `1`. */
  ratio?: AspectRatioValue;
}

export interface AspectRatioProps extends AspectRatioCoreProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
}
