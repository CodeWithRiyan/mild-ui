// packages/vue/src/components/Card/context.ts
import { computed, inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { CardPadding } from "../../types/data-display";

export interface CardContextValue {
  padding: ComputedRef<CardPadding>;
}

const CardKey: InjectionKey<CardContextValue> = Symbol("mild-ui:card");

export function provideCard(context: CardContextValue): void {
  provide(CardKey, context);
}

/** The enclosing card's padding, `"md"` outside a card. */
export function useCardPadding(override: () => CardPadding | undefined): ComputedRef<CardPadding> {
  const card = inject(CardKey, null);
  return computed(() => override() ?? card?.padding.value ?? "md");
}

/** `.mild-card-<part>--padding-<size>` unless the padding is the default. */
export function paddingClass(block: string, padding: CardPadding): string | false {
  return padding !== "md" && `${block}--padding-${padding}`;
}
