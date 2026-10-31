// Breadcrumb component types.

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
