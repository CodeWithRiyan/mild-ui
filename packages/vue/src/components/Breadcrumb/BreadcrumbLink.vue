<!-- packages/vue/src/components/Breadcrumb/BreadcrumbLink.vue -->
<script setup lang="ts">
import { Link } from "../Link";
import type { BreadcrumbLinkProps } from "../../types/breadcrumb";

// A link inside a `BreadcrumbItem`; `current` renders the page name instead of a link: the
// current page is announced with aria-current, not linked.
withDefaults(defineProps<BreadcrumbLinkProps>(), {
  as: undefined,
  current: false,
  href: undefined,
  underline: "hover",
  external: false,
  plain: true,
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <component :is="as ?? 'span'" v-if="current" class="mild-breadcrumb-page" aria-current="page">
    <slot />
  </component>
  <Link
    v-else
    :as="as ?? 'a'"
    :href="href"
    :underline="underline"
    :external="external"
    :disabled="disabled"
    plain
    class="mild-breadcrumb-link"
    @click="emit('click', $event)"
  >
    <slot />
  </Link>
</template>
