<!-- packages/vue/src/components/Text/Text.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { TextProps } from "../../types/text";

const props = withDefaults(defineProps<TextProps>(), {
  as: "span",
  fontSize: "md",
  fontWeight: "normal",
  textAlign: "left",
  textTransform: "none",
  textDecoration: "none",
  color: undefined,
  lineHeight: undefined,
  letterSpacing: undefined,
  truncate: false,
  noOfLines: undefined,
});

const classes = computed(() =>
  cn(
    "mild-text",
    `mild-text--${props.fontSize}`,
    `mild-text--${props.fontWeight}`,
    `mild-text--${props.textAlign}`,
    props.textTransform !== "none" && `mild-text--${props.textTransform}`,
    props.textDecoration !== "none" && `mild-text--${props.textDecoration}`,
    props.truncate && "mild-text--truncate",
    props.noOfLines && `mild-text--clamp-${props.noOfLines}`,
    props.color && `mild-text--${props.color}`,
  ),
);

const style = computed(() => {
  const result: Record<string, string | number> = {};
  if (props.lineHeight) result.lineHeight = props.lineHeight;
  if (props.letterSpacing) {
    result.letterSpacing =
      typeof props.letterSpacing === "number" ? `${props.letterSpacing}em` : props.letterSpacing;
  }
  return Object.keys(result).length > 0 ? result : undefined;
});

// Template notes
// Typography primitive. Renders a `span` by default, or the element given with `as` (`p`,
// `h1`..`h6`, `label`, ...).
</script>

<template>
  <component :is="as" :class="classes" :style="style"><slot /></component>
</template>
