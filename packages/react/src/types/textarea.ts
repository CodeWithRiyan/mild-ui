// Textarea component types. Mirrors the Input props, plus the multi-line specifics.
import type { Size } from "./common";
import type { InputCoreProps } from "./input";

export type TextareaSize = Exclude<Size, "xs" | "xl">;
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface TextareaCoreProps extends Pick<
  InputCoreProps,
  "variant" | "isDisabled" | "isReadOnly" | "isRequired" | "isInvalid" | "fullWidth" | "error"
> {
  size?: TextareaSize;
  /** Which directions the user may drag the field. Default `"vertical"`. */
  resize?: TextareaResize;
  /** Grow with the content instead of showing a scrollbar (disables manual resizing). */
  autoResize?: boolean;
}
