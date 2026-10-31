// packages/vue/src/types/disclosure.ts
// Accordion / Collapsible component types.
import type { Size } from "./common";

export type AccordionVariant = "default" | "ghost" | "bordered";
export type AccordionSize = Exclude<Size, "xs" | "xl">;
export type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;
export type AccordionType = "single" | "multiple";

export interface AccordionProps {
  /** `"single"` (default) opens one panel at a time, `"multiple"` any number. */
  type?: AccordionType;
  /** `v-model`: `string | null` for single, `string[]` for multiple. */
  modelValue?: string | string[] | null;
  defaultValue?: string | string[] | null;
  /** In single mode, allow closing the open panel. Default `true`. */
  collapsible?: boolean;
  variant?: AccordionVariant;
  size?: AccordionSize;
  /** Heading level of the item headers. Default `3`. */
  headingLevel?: AccordionHeadingLevel;
  disabled?: boolean;
}

export interface AccordionItemProps {
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps {
  /** Drop the chevron. */
  noIcon?: boolean;
}

export interface AccordionContentProps {
  /** Keep the panel in the DOM (hidden) while closed. Default `true`. */
  forceMount?: boolean;
}

export interface CollapsibleProps {
  /** `v-model:open` */
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
}

export interface CollapsibleTriggerProps {
  /** Drop the chevron. */
  noIcon?: boolean;
}

export interface CollapsibleContentProps {
  /** Keep the content in the DOM (hidden) while closed. Default `true`. */
  forceMount?: boolean;
}
