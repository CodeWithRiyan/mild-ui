// packages/vue/src/components/Avatar/context.ts
import { inject, provide, type ComputedRef, type InjectionKey } from "vue";
import type { AvatarSize } from "../../types/data-display";

export interface AvatarGroupContextValue {
  size: ComputedRef<AvatarSize | undefined>;
}

const AvatarGroupKey: InjectionKey<AvatarGroupContextValue> = Symbol("mild-ui:avatar-group");

export function provideAvatarGroup(context: AvatarGroupContextValue): void {
  provide(AvatarGroupKey, context);
}

export function useAvatarGroup(): AvatarGroupContextValue | null {
  return inject(AvatarGroupKey, null);
}
