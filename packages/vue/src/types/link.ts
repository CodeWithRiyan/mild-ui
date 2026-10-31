// packages/vue/src/types/link.ts
import type { Component } from "vue";

/** When the underline is drawn. */
export type LinkUnderline = "none" | "hover" | "always";

export interface LinkCoreProps {
  /** Target URL. */
  href?: string;
  /** Underline behaviour. Default `"hover"`. */
  underline?: LinkUnderline;
  /**
   * Opens in a new tab: sets `target="_blank"` and `rel="noopener noreferrer"` unless the
   * caller passes its own.
   */
  external?: boolean;
  /** Inherit the surrounding text color instead of the accent color. */
  plain?: boolean;
  /**
   * Inert link: `aria-disabled="true"`, no `href`, not focusable, clicks are swallowed.
   */
  disabled?: boolean;
}

export interface LinkProps extends LinkCoreProps {
  /** Element or component to render. Defaults to `a`; pass a router link component. */
  as?: string | Component;
}
