<!-- packages/vue/src/components/Box/Box.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import {
  getSpacingValue,
  getDimensionValue,
  getRadiusValue,
  getColorValue,
} from "../../utils/styling";
import { shortAlignment as short } from "../../utils/layout";
import type { BoxProps } from "../../types/box";

const props = withDefaults(defineProps<BoxProps>(), {
  as: "div",
  display: "block",
});

const classes = computed(() =>
  cn(
    "mild-box",
    `mild-box--${props.display}`,
    props.flexDirection && `mild-box--flex-${props.flexDirection}`,
    props.flexWrap && `mild-box--flex-${props.flexWrap}`,
    props.alignItems && `mild-box--items-${short(props.alignItems)}`,
    props.justifyContent && `mild-box--justify-${short(props.justifyContent)}`,
    props.position && `mild-box--${props.position}`,
    props.overflow && `mild-box--overflow-${props.overflow}`,
    props.overflowX && `mild-box--overflow-x-${props.overflowX}`,
    props.overflowY && `mild-box--overflow-y-${props.overflowY}`,
  ),
);

// Inline styles for the token-driven props: every value resolves to a themed custom property.
const style = computed(() => {
  const result: Record<string, string | number> = {};
  const p = props;

  if (p.padding) result.padding = getSpacingValue(p.padding);
  if (p.paddingX) {
    result.paddingLeft = getSpacingValue(p.paddingX);
    result.paddingRight = getSpacingValue(p.paddingX);
  }
  if (p.paddingY) {
    result.paddingTop = getSpacingValue(p.paddingY);
    result.paddingBottom = getSpacingValue(p.paddingY);
  }
  if (p.paddingTop) result.paddingTop = getSpacingValue(p.paddingTop);
  if (p.paddingRight) result.paddingRight = getSpacingValue(p.paddingRight);
  if (p.paddingBottom) result.paddingBottom = getSpacingValue(p.paddingBottom);
  if (p.paddingLeft) result.paddingLeft = getSpacingValue(p.paddingLeft);
  if (p.margin) result.margin = getSpacingValue(p.margin);
  if (p.marginX) {
    result.marginLeft = getSpacingValue(p.marginX);
    result.marginRight = getSpacingValue(p.marginX);
  }
  if (p.marginY) {
    result.marginTop = getSpacingValue(p.marginY);
    result.marginBottom = getSpacingValue(p.marginY);
  }
  if (p.marginTop) result.marginTop = getSpacingValue(p.marginTop);
  if (p.marginRight) result.marginRight = getSpacingValue(p.marginRight);
  if (p.marginBottom) result.marginBottom = getSpacingValue(p.marginBottom);
  if (p.marginLeft) result.marginLeft = getSpacingValue(p.marginLeft);

  if (p.gap) result.gap = getSpacingValue(p.gap);
  if (p.gridTemplateColumns) result.gridTemplateColumns = p.gridTemplateColumns;
  if (p.gridTemplateRows) result.gridTemplateRows = p.gridTemplateRows;
  if (p.gridGap) result.gap = getSpacingValue(p.gridGap);

  if (p.width) result.width = getDimensionValue(p.width);
  if (p.height) result.height = getDimensionValue(p.height);
  if (p.minWidth) result.minWidth = getDimensionValue(p.minWidth);
  if (p.minHeight) result.minHeight = getDimensionValue(p.minHeight);
  if (p.maxWidth) result.maxWidth = getDimensionValue(p.maxWidth);
  if (p.maxHeight) result.maxHeight = getDimensionValue(p.maxHeight);

  if (p.borderRadius) result.borderRadius = getRadiusValue(p.borderRadius);
  if (p.borderWidth) result.borderWidth = getSpacingValue(p.borderWidth);
  if (p.borderColor) result.borderColor = getColorValue(p.borderColor);
  if (p.backgroundColor) result.backgroundColor = getColorValue(p.backgroundColor);
  if (p.color) result.color = getColorValue(p.color);

  if (p.top) result.top = getSpacingValue(p.top);
  if (p.right) result.right = getSpacingValue(p.right);
  if (p.bottom) result.bottom = getSpacingValue(p.bottom);
  if (p.left) result.left = getSpacingValue(p.left);
  if (p.zIndex) result.zIndex = p.zIndex;

  return Object.keys(result).length > 0 ? result : undefined;
});

// Template notes
// Layout primitive. Renders a `div` by default, or the element given with `as`, and maps its
// style props (design tokens only) onto themed CSS custom properties.
</script>

<template>
  <component :is="as" :class="classes" :style="style"><slot /></component>
</template>
