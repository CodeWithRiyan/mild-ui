<!-- packages/vue/src/components/Toggle/Toggle.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";
import type { ToggleProps } from "../../types/toggle";

// A two-state button (`aria-pressed`): bold on/off, mute on/off. Controlled through
// `v-model:pressed`, or uncontrolled with `defaultPressed`.
const props = withDefaults(defineProps<ToggleProps>(), {
  pressed: undefined,
  defaultPressed: false,
  variant: "ghost",
  size: "md",
  disabled: false,
});

const emit = defineEmits<{
  /** `v-model:pressed` */
  (e: "update:pressed", pressed: boolean): void;
  /** Fired on every user toggle, controlled or not. */
  (e: "change", pressed: boolean): void;
  /** Fired before the toggle; `preventDefault()` cancels it. */
  (e: "click", event: MouseEvent): void;
}>();

const internal = ref(props.defaultPressed);
const isControlled = computed(() => props.pressed !== undefined);
const pressed = computed(() => (isControlled.value ? Boolean(props.pressed) : internal.value));

const classes = computed(() =>
  cn("mild-toggle", `mild-toggle--${props.variant}`, `mild-toggle--${props.size}`),
);

function handleClick(event: MouseEvent): void {
  emit("click", event);
  if (event.defaultPrevented || props.disabled) return;
  const next = !pressed.value;
  if (!isControlled.value) internal.value = next;
  emit("update:pressed", next);
  emit("change", next);
}
</script>

<template>
  <button
    type="button"
    :aria-pressed="pressed"
    :data-state="pressed ? 'on' : 'off'"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
