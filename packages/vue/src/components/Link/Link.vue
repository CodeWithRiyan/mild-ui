<!-- packages/vue/src/components/Link/Link.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import type { LinkProps } from "../../types/link";

// Navigational link. Renders an `a`; pass `as` to use a router link
// (`<Link :as="RouterLink" to="/docs">`). `external` adds `target="_blank"` with a safe `rel`
// (a caller's own `target`/`rel` attributes still win), and `disabled` makes it inert while
// keeping the link role.
const props = withDefaults(defineProps<LinkProps>(), {
  as: "a",
  href: undefined,
  underline: "hover",
  external: false,
  plain: false,
  disabled: false,
});

const emit = defineEmits<{
  /** Not emitted while disabled. */
  (e: "click", event: MouseEvent): void;
}>();

const classes = computed(() =>
  cn(
    "mild-link",
    `mild-link--underline-${props.underline}`,
    props.plain && "mild-link--plain",
    props.disabled && "mild-link--disabled",
  ),
);

// A disabled link keeps its role but is inert: no href, out of the tab order, clicks swallowed.
// `href` is only passed when set, so a router component given with `as` keeps its own.
const state = computed(() =>
  props.disabled
    ? { "aria-disabled": "true", tabindex: -1, role: "link" }
    : props.href !== undefined
      ? { href: props.href }
      : {},
);

// `external` fills in the usual target/rel pair unless the caller set them (attributes fall
// through after these, so theirs win).
const target = computed(() =>
  props.external ? { target: "_blank", rel: "noopener noreferrer" } : undefined,
);

function handleClick(event: MouseEvent): void {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <component :is="as" :class="classes" v-bind="{ ...target, ...state }" @click="handleClick">
    <slot />
  </component>
</template>
