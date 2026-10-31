<!-- packages/vue/src/components/AspectRatio/AspectRatio.vue -->
<script lang="ts">
import type { AspectRatioValue } from "../../types/aspect-ratio";

/** `16 / 9` -> `"1.7777777777777777"`, `"16/9"` -> `"16 / 9"` (both valid `aspect-ratio` values). */
export function toCssAspectRatio(ratio: AspectRatioValue): string {
  return typeof ratio === "number"
    ? String(ratio)
    : ratio
        .split("/")
        .map((part) => part.trim())
        .join(" / ");
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import type { AspectRatioProps } from "../../types/aspect-ratio";

// Keeps its child at a fixed width/height ratio (`:ratio="16 / 9"`); the child fills the box.
// Renders a `div`, or the element given with `as`.
const props = withDefaults(defineProps<AspectRatioProps>(), {
  as: "div",
  ratio: 1,
});

const style = computed(() => ({ "--mild-aspect-ratio": toCssAspectRatio(props.ratio) }));
</script>

<template>
  <component :is="as" class="mild-aspect-ratio" :style="style"><slot /></component>
</template>
