// Accordion / Collapsible component types.
import type { Size } from "./common";

export type AccordionVariant = "default" | "ghost" | "bordered";
export type AccordionSize = Exclude<Size, "xs" | "xl">;
export type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface AccordionCoreProps {
  variant?: AccordionVariant;
  size?: AccordionSize;
  /** Heading level of the item headers. Default `3`. */
  headingLevel?: AccordionHeadingLevel;
  disabled?: boolean;
}

/** One panel open at a time. */
export interface AccordionSingleProps extends AccordionCoreProps {
  type?: "single";
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Allow closing the open panel. Default `true`. */
  collapsible?: boolean;
}

/** Any number of panels open. */
export interface AccordionMultipleProps extends AccordionCoreProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export interface CollapsibleCoreProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}
