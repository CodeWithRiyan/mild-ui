// packages/vue/src/types/nav.ts
import type { Component } from "vue";

/** Look of the links. */
export type NavVariant = "pills" | "underline" | "plain";

/** Direction of the list. */
export type NavOrientation = "horizontal" | "vertical";

/** Extra classes for the inner parts. */
export interface NavUiClasses {
  list?: string;
}

export interface NavProps {
  /** Look of the links. Default `"plain"`. */
  variant?: NavVariant;
  /** Direction of the list. Default `"horizontal"`. */
  orientation?: NavOrientation;
  ui?: NavUiClasses;
}

export interface NavItemProps {
  /** Element to render. Defaults to `li`. */
  as?: string;
}

export interface NavLinkProps {
  /** Element or component to render. Defaults to `a`; pass a router link component. */
  as?: string | Component;
  /** The link to the current page: gets `aria-current="page"` and the active style. */
  active?: boolean;
  /** Renders inert text (`aria-disabled`) instead of a link. */
  disabled?: boolean;
}
