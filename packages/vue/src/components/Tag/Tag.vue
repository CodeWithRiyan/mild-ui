<!-- packages/vue/src/components/Tag/Tag.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";
import { provideTag } from "./context";
import TagCloseButton from "./TagCloseButton.vue";
import type { TagProps } from "../../types/data-display";

// A label that can be removed (a filter chip, a selected option). The close button is a real
// button in the tab order, named "Remove" (or `closeLabel`) plus the tag's text.
const props = withDefaults(defineProps<TagProps>(), {
  variant: "subtle",
  colorScheme: "gray",
  size: "md",
  pill: false,
  disabled: false,
  closable: false,
  closeLabel: "Remove",
});

const emit = defineEmits<{
  /** The close button was pressed. */
  (e: "close"): void;
}>();

defineSlots<{
  default?: () => unknown;
  /** Leading glyph. */
  icon?: () => unknown;
}>();

provideTag({ disabled: computed(() => props.disabled) });

const label = ref<HTMLSpanElement | null>(null);
// The button is named after the label's text, read from the DOM so rich labels work too.
const closeName = computed(() => {
  const text = label.value?.textContent?.trim();
  return text ? `${props.closeLabel} ${text}` : props.closeLabel;
});

function close(): void {
  emit("close");
}

const classes = computed(() =>
  cn(
    "mild-tag",
    `mild-tag--${props.variant}`,
    `mild-tag--${props.colorScheme}`,
    `mild-tag--${props.size}`,
    props.pill && "mild-tag--pill",
    props.disabled && "mild-tag--disabled",
  ),
);
</script>

<template>
  <span :class="classes" :data-disabled="disabled ? '' : undefined">
    <span v-if="$slots.icon" class="mild-tag__icon" aria-hidden="true"><slot name="icon" /></span>
    <span ref="label" class="mild-tag__label"><slot /></span>
    <TagCloseButton v-if="closable" :label="closeName" @click="close" />
  </span>
</template>
