<!-- packages/vue/src/components/Alert/Alert.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";
import { StatusIcon, XIcon } from "../icons";
import type { AlertProps } from "../../types/feedback";

// Inline status message. Rendered with `role="alert"` for errors and warnings (announced at
// once) and `role="status"` otherwise (announced politely), unless a `role` is given.
const props = withDefaults(defineProps<AlertProps>(), {
  status: "info",
  variant: "subtle",
  size: "md",
  dismissible: false,
  title: undefined,
  description: undefined,
  noIcon: false,
  dismissLabel: "Dismiss",
  role: undefined,
});

const emit = defineEmits<{
  (e: "dismiss"): void;
}>();

const slots = defineSlots<{
  /** Body content; an alias of `description`. */
  default?: () => unknown;
  title?: () => unknown;
  /** Replaces the status glyph. */
  icon?: () => unknown;
}>();

const role = computed(
  () => props.role ?? (props.status === "error" || props.status === "warning" ? "alert" : "status"),
);
const hasTitle = computed(() => props.title !== undefined || Boolean(slots.title));
const hasBody = computed(() => props.description !== undefined || Boolean(slots.default));

const classes = computed(() =>
  cn(
    "mild-alert",
    `mild-alert--${props.variant}`,
    `mild-alert--${props.status}`,
    props.size !== "md" && `mild-alert--${props.size}`,
    props.dismissible && "mild-alert--dismissible",
  ),
);
</script>

<template>
  <div :role="role" :data-status="status" :class="classes">
    <span v-if="!noIcon" class="mild-alert__icon" aria-hidden="true">
      <slot name="icon"><StatusIcon :status="status" /></slot>
    </span>
    <div class="mild-alert__content">
      <div v-if="hasTitle" class="mild-alert__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasBody" class="mild-alert__description">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="mild-alert__dismiss"
      :aria-label="dismissLabel"
      @click="emit('dismiss')"
    >
      <XIcon />
    </button>
  </div>
</template>
