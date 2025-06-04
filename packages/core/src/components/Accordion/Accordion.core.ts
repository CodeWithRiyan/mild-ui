// packages/core/src/components/Accordion/Accordion.core.ts
import {
  AccordionCoreProps,
  AccordionStyleProps,
  AccordionItemStyleProps,
  AccordionTriggerStyleProps,
  AccordionContentStyleProps,
} from "./Accordion.types";
import {
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from "./Accordion.styles";
import { cn } from "../../utils/cn";

export function getAccordionProps(
  props: AccordionStyleProps & { className?: string },
) {
  const { variant = "default", size = "md", className } = props;

  return {
    className: cn(accordionVariants({ variant, size }), className),
    variant,
    size,
  };
}

export function getAccordionItemProps(
  props: AccordionItemStyleProps & { className?: string },
) {
  const { variant = "default", size = "md", className } = props;

  return {
    className: cn(accordionItemVariants({ variant, size }), className),
    variant,
    size,
  };
}

export function getAccordionTriggerProps(
  props: AccordionTriggerStyleProps & { className?: string },
) {
  const { variant = "default", size = "md", className } = props;

  return {
    className: cn(accordionTriggerVariants({ variant, size }), className),
    variant,
    size,
  };
}

export function getAccordionContentProps(
  props: AccordionContentStyleProps & { className?: string },
) {
  const { variant = "default", size = "md", className } = props;

  return {
    className: cn(accordionContentVariants({ variant, size }), className),
    variant,
    size,
  };
}