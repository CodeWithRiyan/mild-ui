// packages/vue/src/types/scroll-area.ts
// ScrollArea component types: a scroll container with themed scrollbars.
import type { DimensionToken } from "./tokens";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
/** When scrollbars are visible: browser default, always, only on hover/focus, or never. */
export type ScrollAreaScrollbars = "auto" | "always" | "hover" | "hidden";

export interface ScrollAreaCoreProps {
  /** Which axis scrolls. Default `"vertical"`. */
  orientation?: ScrollAreaOrientation;
  /** Scrollbar visibility. Default `"auto"`. */
  scrollbars?: ScrollAreaScrollbars;
  /** Fixed height (dimension token). */
  height?: DimensionToken;
  /** Max height (dimension token); the usual way to make a vertical area scroll. */
  maxHeight?: DimensionToken;
  /** Max width (dimension token); the usual way to make a horizontal area scroll. */
  maxWidth?: DimensionToken;
}

export interface ScrollAreaProps extends ScrollAreaCoreProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
}
