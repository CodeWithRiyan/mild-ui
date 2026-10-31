// packages/vue/src/types/container.ts
// Container component types: a horizontally centered max-width wrapper.
import type { SpaceToken, Breakpoint } from "./tokens";

/** Max-width, from the breakpoint scale (`--mild-breakpoint-*`); `"full"` removes the limit. */
export type ContainerSize = Breakpoint | "full";

export interface ContainerCoreProps {
  /** Max-width. Default `"lg"` (1024px). */
  size?: ContainerSize;
  /** Horizontal padding (spacing token). Default comes from the stylesheet (`"4"`). */
  padding?: SpaceToken;
  /** Center the children too (flex column, centered items). */
  centerContent?: boolean;
}

export interface ContainerProps extends ContainerCoreProps {
  /** Element to render. Defaults to `div`. */
  as?: string;
}
