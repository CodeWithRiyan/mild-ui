<!-- packages/vue/src/components/Divider/Divider.vue -->
<script lang="ts">
import { computed, defineComponent, h, type PropType } from "vue";
import { cn } from "../../utils/cn";
import { getColorValue } from "../../utils/styling";
import type {
  DividerLabelPosition,
  DividerOrientation,
  DividerSize,
  DividerVariant,
} from "../../types/divider";
import type { ColorToken } from "../../types/tokens";

/**
 * Horizontal or vertical separator (`role="separator"`), optionally with a label on the line.
 * Renders a `div`, or the element given with `as` (`hr`, `li`, ...).
 *
 * A render function rather than a template: a void `as="hr"` must get no children at all (not
 * even a `v-if` placeholder comment).
 */
export default defineComponent({
  name: "Divider",
  props: {
    as: { type: String, default: "div" },
    orientation: { type: String as PropType<DividerOrientation>, default: "horizontal" },
    variant: { type: String as PropType<DividerVariant>, default: "solid" },
    size: { type: String as PropType<DividerSize>, default: "sm" },
    color: { type: String as PropType<ColorToken>, default: undefined },
    label: { type: String, default: undefined },
    labelPosition: { type: String as PropType<DividerLabelPosition>, default: "center" },
    decorative: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const hasLabel = computed(() => props.label !== undefined || Boolean(slots.label));

    const classes = computed(() =>
      cn(
        "mild-divider",
        `mild-divider--${props.orientation}`,
        `mild-divider--${props.variant}`,
        `mild-divider--${props.size}`,
        hasLabel.value && "mild-divider--with-label",
        hasLabel.value &&
          props.labelPosition !== "center" &&
          `mild-divider--label-${props.labelPosition}`,
      ),
    );

    // The line color is a custom property so that a label keeps the text color.
    const style = computed(() =>
      props.color ? { "--mild-divider-color": getColorValue(props.color) } : undefined,
    );

    const a11y = computed(() =>
      props.decorative
        ? { role: "none", "aria-hidden": "true" }
        : { role: "separator", "aria-orientation": props.orientation },
    );

    return () =>
      h(
        props.as,
        { class: classes.value, style: style.value, ...a11y.value },
        hasLabel.value
          ? [h("span", { class: "mild-divider__label" }, slots.label?.() ?? props.label)]
          : undefined,
      );
  },
});
</script>
