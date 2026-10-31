// packages/vue/src/types/input-group.ts
import type { Size } from "./common";

export type InputGroupSize = Exclude<Size, "xs" | "xl">;
export type InputGroupPlacement = "left" | "right";

export interface InputGroupCoreProps {
  /** Size shared by the input, the addons and the elements. Default `"md"`. */
  size?: InputGroupSize;
  /** Shrink to the content instead of filling the line. */
  inline?: boolean;
}

export interface InputGroupProps extends InputGroupCoreProps {
  /** Goes to the input inside (so the group can be the child of a <FormField>). */
  id?: string;
  /** Goes to the input inside. */
  name?: string;
  /** Goes to the input inside. */
  required?: boolean;
}

export interface InputAddonProps {
  placement?: InputGroupPlacement;
}

export interface InputElementProps {
  placement?: InputGroupPlacement;
  /**
   * The element receives pointer events (a button, a clear icon). By default it is decorative
   * and clicks fall through to the field.
   */
  interactive?: boolean;
}
