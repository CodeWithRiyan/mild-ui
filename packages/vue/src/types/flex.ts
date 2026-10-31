// packages/vue/src/types/flex.ts
// Flex component types: a general-purpose flex container.
import type { SpaceToken } from "./tokens";
import type { FlexDirection, FlexWrap, AlignItems, JustifyContent } from "./common";

export interface FlexCoreProps {
  /** `flex-direction`. Default `"row"`. */
  direction?: FlexDirection;
  /** `flex-wrap`; `true` is `"wrap"`. */
  wrap?: boolean | FlexWrap;
  /** `align-items`. */
  align?: AlignItems;
  /** `justify-content`. */
  justify?: JustifyContent;
  /** Space between children (spacing token). */
  gap?: SpaceToken;
  /** Render as `inline-flex`. */
  inline?: boolean;
}

export interface FlexProps extends FlexCoreProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
}
