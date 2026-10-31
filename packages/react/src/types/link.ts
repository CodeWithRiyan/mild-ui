// Link component types.

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
