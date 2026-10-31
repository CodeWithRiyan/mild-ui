<!-- packages/vue/src/components/Button/Button.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { getButtonProps, getButtonState, getButtonA11yProps } from "../../utils/button";
import { useButtonGroup } from "../ButtonGroup/context";
import type { ButtonProps } from "../../types/button";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: undefined,
  size: undefined,
  colorScheme: undefined,
  fullWidth: false,
  loading: false,
  disabled: undefined,
  type: "button",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const slots = defineSlots<{
  default?: () => unknown;
  /** Icon before the label. */
  leftIcon?: () => unknown;
  /** Icon after the label. */
  rightIcon?: () => unknown;
  /** @deprecated Use `leftIcon`. */
  "leading-icon"?: () => unknown;
  /** @deprecated Use `rightIcon`. */
  "trailing-icon"?: () => unknown;
}>();

// An enclosing <ButtonGroup> supplies defaults; the button's own props still win.
const group = useButtonGroup();
const variant = computed(() => props.variant ?? group?.variant.value ?? "primary");
const size = computed(() => props.size ?? group?.size.value ?? "md");
const disabled = computed(() => props.disabled ?? group?.disabled.value ?? false);

const buttonProps = computed(() =>
  getButtonProps({
    variant: variant.value,
    size: size.value,
    colorScheme: props.colorScheme,
    fullWidth: props.fullWidth,
    loading: props.loading,
    disabled: disabled.value,
  }),
);

const state = computed(() => getButtonState({ loading: props.loading, disabled: disabled.value }));

const a11yProps = computed(() =>
  getButtonA11yProps({ loading: props.loading, disabled: disabled.value, type: props.type }),
);

const leftIcon = computed(() => slots.leftIcon ?? slots["leading-icon"]);
const rightIcon = computed(() => slots.rightIcon ?? slots["trailing-icon"]);

function handleClick(event: MouseEvent): void {
  if (!state.value.canClick) {
    event.preventDefault();
    return;
  }
  emit("click", event);
}

// Template notes
// The label stays in the DOM while loading (the stylesheet fades it under the spinner), so the
// button keeps its accessible name and is announced busy rather than going silent.
</script>

<template>
  <button
    :class="buttonProps.className"
    :disabled="buttonProps.disabled"
    :data-loading="buttonProps['data-loading']"
    :data-disabled="buttonProps['data-disabled']"
    :type="a11yProps.type"
    :aria-disabled="a11yProps['aria-disabled']"
    :aria-busy="a11yProps['aria-busy']"
    :tabindex="a11yProps.tabindex"
    @click="handleClick"
  >
    <span v-if="leftIcon" class="mild-button__left-icon" aria-hidden="true">
      <component :is="leftIcon" />
    </span>

    <span v-if="state.isLoading" class="mild-button__spinner" aria-hidden="true" />
    <span class="mild-button__content"><slot /></span>

    <span v-if="rightIcon" class="mild-button__right-icon" aria-hidden="true">
      <component :is="rightIcon" />
    </span>
  </button>
</template>
