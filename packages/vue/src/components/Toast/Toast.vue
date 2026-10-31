<!-- packages/vue/src/components/Toast/Toast.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { createToastTimer } from "@mild-ui/primitives/toast";
import { cn } from "../../utils/cn";
import { useMachine } from "../../composables/useMachine";
import { CloseButton } from "../CloseButton";
import { StatusIcon } from "../icons";
import type { ToastProps } from "../../types/toast";

// One notification. Errors and warnings are `role="alert"`, the rest `role="status"`. The
// auto-dismiss countdown (from `@mild-ui/primitives/toast`) pauses while the pointer is over
// the toast or focus is inside it.
const props = withDefaults(defineProps<ToastProps>(), {
  id: undefined,
  title: undefined,
  description: undefined,
  status: "info",
  duration: 5000,
  closable: true,
  noIcon: false,
  closeLabel: "Close",
});

const emit = defineEmits<{
  /** The toast expired or its close button was pressed. */
  (e: "close"): void;
}>();

const slots = defineSlots<{
  default?: () => unknown;
  title?: () => unknown;
  description?: () => unknown;
  /** An action rendered under the text (a button, a link). */
  action?: () => unknown;
  /** Replaces the status icon. */
  icon?: () => unknown;
}>();

const element = ref<HTMLDivElement | null>(null);

useMachine(
  element,
  (el, options) => createToastTimer({ element: el, ...options }),
  () => ({ duration: props.duration, onExpire: () => emit("close") }),
  undefined,
  // A new duration restarts the countdown.
  () => props.duration,
);

const role = computed(() =>
  props.status === "error" || props.status === "warning" ? "alert" : "status",
);
const hasTitle = computed(() => props.title !== undefined || Boolean(slots.title));
const hasDescription = computed(
  () => props.description !== undefined || Boolean(slots.description),
);
</script>

<template>
  <div
    :id="id"
    ref="element"
    :role="role"
    :data-status="status"
    :class="cn('mild-toast', `mild-toast--${status}`)"
  >
    <span v-if="!noIcon" class="mild-toast__icon" aria-hidden="true">
      <slot name="icon"><StatusIcon :status="status" /></slot>
    </span>
    <div class="mild-toast__content">
      <div v-if="hasTitle" class="mild-toast__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasDescription" class="mild-toast__description">
        <slot name="description">{{ description }}</slot>
      </div>
      <slot />
      <div v-if="$slots.action" class="mild-toast__action"><slot name="action" /></div>
    </div>
    <CloseButton
      v-if="closable"
      size="xs"
      :label="closeLabel"
      class="mild-toast__close"
      @click="emit('close')"
    />
  </div>
</template>
