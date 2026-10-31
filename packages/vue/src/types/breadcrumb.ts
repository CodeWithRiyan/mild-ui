// packages/vue/src/types/breadcrumb.ts
import type { Component } from "vue";
import type { LinkCoreProps } from "./link";

export interface BreadcrumbItemData {
  /** Visible text. */
  label: string;
  /** Target URL; omit for the current page. */
  href?: string;
  /** Marks the item as the current page (`aria-current="page"`). The last item is current
   * by default when it has no `href`. */
  current?: boolean;
}

export interface BreadcrumbCoreProps {
  /** Trail to render. Omit and pass children to compose the items yourself. */
  items?: BreadcrumbItemData[];
}

/** Extra classes for the inner parts. */
export interface BreadcrumbUiClasses {
  list?: string;
  separator?: string;
}

export interface BreadcrumbProps extends BreadcrumbCoreProps {
  /** Element to render. Defaults to `nav`. */
  as?: string;
  /** Glyph between two items. Default `"/"`. Use the `separator` slot for rich content. */
  separator?: string;
  ui?: BreadcrumbUiClasses;
}

export interface BreadcrumbItemProps {
  /** Element to render. Defaults to `li`. */
  as?: string;
}

export interface BreadcrumbLinkProps extends LinkCoreProps {
  /** Element or component to render. */
  as?: string | Component;
  /** The current page: rendered as text with `aria-current="page"` instead of a link. */
  current?: boolean;
}

export interface BreadcrumbSeparatorProps {
  /** Separator content. Default `"/"`. */
  children?: string;
}
