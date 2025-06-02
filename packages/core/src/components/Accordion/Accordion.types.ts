// packages/core/src/components/Accordion/Accordion.types.ts
export interface AccordionCoreProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  collapsible?: boolean;
  disabled?: boolean;
  className?: string;
}

export type AccordionSize = "sm" | "md" | "lg";
export type AccordionVariant = "default" | "ghost" | "bordered";

export interface AccordionStyleProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
}

export interface AccordionItemCoreProps {
  value: string;
  disabled?: boolean;
  className?: string;
}

export interface AccordionItemStyleProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
}

export interface AccordionTriggerCoreProps {
  className?: string;
}

export interface AccordionTriggerStyleProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
}

export interface AccordionContentCoreProps {
  className?: string;
}

export interface AccordionContentStyleProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
}
