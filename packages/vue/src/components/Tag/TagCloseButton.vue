<!-- packages/vue/src/components/Tag/TagCloseButton.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { XIcon } from "../icons";
import { useTag } from "./context";
import type { TagCloseButtonProps } from "../../types/data-display";

// The tag's remove button. Disabled along with the tag. The default slot replaces the X glyph.
const props = withDefaults(defineProps<TagCloseButtonProps>(), {
  disabled: undefined,
  label: "Remove",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const tag = useTag();
const disabled = computed(() => props.disabled ?? tag?.disabled.value ?? false);
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :disabled="disabled"
    class="mild-tag__close"
    @click="emit('click', $event)"
  >
    <slot><XIcon /></slot>
  </button>
</template>
