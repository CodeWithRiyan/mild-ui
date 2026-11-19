<!-- packages/vue/src/components/Nav/NavLink.vue -->
<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { NavLinkProps } from "../../types/nav";

// A link of the nav. `active` marks the current page (`aria-current="page"` on this link
// only); `disabled` renders a `span` so nothing focusable or clickable is left; `as` takes a
// router link component (`<NavLink :as="RouterLink" to="/docs">`).
defineOptions({ inheritAttrs: false });

withDefaults(defineProps<NavLinkProps>(), {
  as: "a",
  active: false,
  disabled: false,
});

const attrs = useAttrs();

const LINK_ONLY_ATTRIBUTES = new Set(["href", "to", "target", "rel", "onClick"]);

// A disabled item is plain text: attributes that only make sense on a link are dropped.
const textAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([name]) => !LINK_ONLY_ATTRIBUTES.has(name))),
);
</script>

<template>
  <span
    v-if="disabled"
    v-bind="textAttrs"
    class="mild-nav-link mild-nav-link--disabled"
    aria-disabled="true"
  >
    <slot />
  </span>
  <component
    :is="as"
    v-else
    v-bind="attrs"
    :class="['mild-nav-link', active && 'mild-nav-link--active']"
    :aria-current="active ? 'page' : undefined"
  >
    <slot />
  </component>
</template>
