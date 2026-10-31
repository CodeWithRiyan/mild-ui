// packages/vue/src/types/kbd.ts
export type KbdSize = "sm" | "md" | "lg";

export interface KbdCoreProps {
  /** Key size. Default `"md"`. */
  size?: KbdSize;
}

export interface KbdProps extends KbdCoreProps {
  /** Element to render. Defaults to `kbd`. */
  as?: string;
}
