<!-- packages/vue/src/components/Avatar/Avatar.vue -->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { cn } from "../../utils/cn";
import { getInitials } from "../../utils/avatar";
import { useAvatarGroup } from "./context";
import { UserIcon } from "../icons";
import type { AvatarProps } from "../../types/data-display";

// A person's picture, or their initials while it loads / when it fails. The `name` is the
// picture's alternative text; without a picture the initials are decorative and the name is
// exposed through `aria-label`.
const props = withDefaults(defineProps<AvatarProps>(), {
  src: undefined,
  name: undefined,
  size: undefined,
  shape: "circle",
  status: undefined,
  bordered: false,
  fallback: undefined,
});

const emit = defineEmits<{
  (e: "load", event: Event): void;
  (e: "error", event: Event): void;
}>();

defineSlots<{
  /** Extra content (a badge of your own). */
  default?: () => unknown;
  /** Replaces the initials when there is no picture. */
  fallback?: () => unknown;
}>();

type LoadState = "idle" | "loaded" | "error";

const group = useAvatarGroup();
const size = computed(() => props.size ?? group?.size.value ?? "md");
const state = ref<LoadState>("idle");
// A new source starts over.
watch(
  () => props.src,
  () => {
    state.value = "idle";
  },
);

const showImage = computed(() => Boolean(props.src) && state.value !== "error");
const initials = computed(() => getInitials(props.name));

const classes = computed(() =>
  cn(
    "mild-avatar",
    `mild-avatar--${size.value}`,
    `mild-avatar--${props.shape}`,
    props.bordered && "mild-avatar--bordered",
  ),
);

function onLoad(event: Event): void {
  state.value = "loaded";
  emit("load", event);
}

function onError(event: Event): void {
  state.value = "error";
  emit("error", event);
}
</script>

<template>
  <span
    :role="showImage ? undefined : 'img'"
    :aria-label="showImage ? undefined : name"
    :class="classes"
    :data-state="showImage ? state : 'fallback'"
  >
    <img
      v-if="showImage"
      :alt="name ?? ''"
      :src="src"
      class="mild-avatar__image"
      @load="onLoad"
      @error="onError"
    />
    <span v-else class="mild-avatar__fallback" aria-hidden="true">
      <slot name="fallback">
        <template v-if="fallback !== undefined">{{ fallback }}</template>
        <template v-else-if="initials">{{ initials }}</template>
        <UserIcon v-else />
      </slot>
    </span>
    <slot />
    <span
      v-if="status"
      :class="cn('mild-avatar__badge', `mild-avatar__badge--${status}`)"
      role="img"
      :aria-label="status"
    />
  </span>
</template>
