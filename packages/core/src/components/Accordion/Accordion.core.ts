// packages/core/src/components/Accordion/Accordion.core.ts
import {
    AccordionCoreProps,
    AccordionStyleProps,
    AccordionItemStyleProps,
    AccordionTriggerStyleProps,
    AccordionContentStyleProps,
  } from "./Accordion.types";
  import {
    accordionStyles,
    accordionItemStyles,
    accordionTriggerStyles,
    accordionContentStyles,
  } from "./Accordion.styles";
  import { cn } from "../../utils/cn";
  
  export function getAccordionProps(props: AccordionStyleProps & { className?: string }) {
    const { variant = "default", size = "md", className } = props;
  
    return {
      className: cn(accordionStyles({ variant, size }), className),
      variant,
      size,
    };
  }
  
  export function getAccordionItemProps(props: AccordionItemStyleProps & { className?: string }) {
    const { variant = "default", size = "md", className } = props;
  
    return {
      className: cn(accordionItemStyles({ variant, size }), className),
      variant,
      size,
    };
  }
  
  export function getAccordionTriggerProps(props: AccordionTriggerStyleProps & { className?: string }) {
    const { variant = "default", size = "md", className } = props;
  
    return {
      className: cn(accordionTriggerStyles({ variant, size }), className),
      variant,
      size,
    };
  }
  
  export function getAccordionContentProps(props: AccordionContentStyleProps & { className?: string }) {
    const { variant = "default", size = "md", className } = props;
  
    return {
      className: cn(accordionContentStyles({ variant, size }), className),
      variant,
      size,
    };
  }