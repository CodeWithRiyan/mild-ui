// packages/vue/src/components/Accordion/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type {
  AccordionHeadingLevel,
  AccordionSize,
  AccordionVariant,
} from "../../types/disclosure";

export interface AccordionContextValue {
  value: ComputedRef<string[]>;
  baseId: string;
  variant: ComputedRef<AccordionVariant>;
  size: ComputedRef<AccordionSize>;
  headingLevel: ComputedRef<AccordionHeadingLevel>;
  disabled: ComputedRef<boolean>;
}

export interface AccordionItemContextValue {
  value: string;
  open: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  triggerId: string;
  contentId: string;
}

const AccordionKey: InjectionKey<AccordionContextValue> = Symbol("mild-ui:accordion");
const AccordionItemKey: InjectionKey<AccordionItemContextValue> = Symbol("mild-ui:accordion-item");

export function provideAccordion(context: AccordionContextValue): void {
  provide(AccordionKey, context);
}

export function provideAccordionItem(context: AccordionItemContextValue): void {
  provide(AccordionItemKey, context);
}

export function useAccordionContext(part: string): AccordionContextValue {
  const context = inject(AccordionKey, null);
  if (!context) throw new Error(`<${part}> must be rendered inside <Accordion>.`);
  return context;
}

export function useAccordionItemContext(part: string): AccordionItemContextValue {
  const context = inject(AccordionItemKey, null);
  if (!context) throw new Error(`<${part}> must be rendered inside <AccordionItem>.`);
  return context;
}
