// InputGroup component types.
import type { Size } from "./common";

export type InputGroupSize = Exclude<Size, "xs" | "xl">;
export type InputGroupPlacement = "left" | "right";

export interface InputGroupCoreProps {
  /** Size shared by the input, the addons and the elements. Default `"md"`. */
  size?: InputGroupSize;
  /** Shrink to the content instead of filling the line. */
  inline?: boolean;
}
