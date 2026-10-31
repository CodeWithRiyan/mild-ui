// packages/vue/src/types/stack.ts
// Stack component types: a flex container that spaces its children along one axis.
import type { SpaceToken } from "./tokens";
import type { FlexDirection, FlexWrap, AlignItems, JustifyContent } from "./common";

export interface StackCoreProps {
  /** Main axis. Default `"column"`. */
  direction?: FlexDirection;
  /** Space between children (spacing token). Default `"4"`. */
  gap?: SpaceToken;
  /** `align-items`. */
  align?: AlignItems;
  /** `justify-content`. */
  justify?: JustifyContent;
  /** `flex-wrap`; `true` is `"wrap"`. */
  wrap?: boolean | FlexWrap;
  /** Render as `inline-flex`. */
  inline?: boolean;
}

export interface StackProps extends StackCoreProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
}
