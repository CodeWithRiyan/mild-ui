// packages/vue/src/composables/useId.ts
import * as Vue from "vue";

let counter = 0;

/**
 * A unique id for ARIA wiring (`aria-labelledby`, `aria-controls`, ...).
 *
 * Vue 3.5 ships `useId()` (stable across server and client); on older 3.x releases, which this
 * package still supports, a counter is used instead. Read through the namespace so the import
 * never fails to link on a Vue without the export.
 */
export function useId(prefix = "mild"): string {
  const vueUseId = (Vue as { useId?: () => string }).useId;
  if (typeof vueUseId === "function" && Vue.getCurrentInstance()) return vueUseId();
  return `${prefix}-${++counter}`;
}
