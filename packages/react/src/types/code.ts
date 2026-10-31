// Code component types.

export type CodeVariant = "subtle" | "solid" | "outline";
export type CodeSize = "sm" | "md" | "lg";

export interface CodeCoreProps {
  /** Visual style. Default `"subtle"`. */
  variant?: CodeVariant;
  /** Font size. Default `"md"` (relative to the surrounding text). */
  size?: CodeSize;
  /** Render as a block (preserved whitespace, horizontal scrolling) instead of inline. */
  block?: boolean;
}
