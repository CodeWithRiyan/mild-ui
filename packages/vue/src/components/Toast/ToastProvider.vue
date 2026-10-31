<!-- packages/vue/src/components/Toast/ToastProvider.vue -->
<script setup lang="ts">
import { computed, onMounted, readonly, ref } from "vue";
import { provideToast } from "./context";
import ToastRegion from "./ToastRegion.vue";
import Toast from "./Toast.vue";
import type {
  ToastData,
  ToastOptions,
  ToastPlacement,
  ToastProviderProps,
} from "../../types/toast";

// Owns the toast queue and renders one region per placement through a teleport. Put it once,
// near the app root; `useToast()` adds, updates and dismisses toasts from anywhere below.
const props = withDefaults(defineProps<ToastProviderProps>(), {
  placement: "bottom-right",
  duration: 5000,
  max: 5,
  label: "Notifications",
});

const PLACEMENTS: readonly ToastPlacement[] = [
  "top-left",
  "top",
  "top-right",
  "bottom-left",
  "bottom",
  "bottom-right",
];

let nextToastId = 0;
const toasts = ref<ToastData[]>([]);
// The regions are teleports: they mount once the page is hydrated.
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

function dismiss(id: string): void {
  toasts.value = toasts.value.filter((entry) => entry.id !== id);
}

function dismissAll(): void {
  toasts.value = [];
}

function toast(options: ToastOptions): string {
  const id = options.id ?? `mild-toast-${++nextToastId}`;
  const placement = options.placement ?? props.placement;
  const data: ToastData = { duration: props.duration, ...options, id, placement };
  const existing = toasts.value.findIndex((entry) => entry.id === id);
  if (existing !== -1) {
    const next = [...toasts.value];
    next[existing] = data;
    toasts.value = next;
    return id;
  }
  const next = [...toasts.value, data];
  // Keep at most `max` per placement, dropping the oldest.
  const same = next.filter((entry) => entry.placement === placement);
  const overflow = same.slice(0, Math.max(0, same.length - props.max));
  toasts.value = overflow.length > 0 ? next.filter((entry) => !overflow.includes(entry)) : next;
  return id;
}

function update(id: string, options: Partial<ToastOptions>): void {
  toasts.value = toasts.value.map((entry) =>
    entry.id === id ? { ...entry, ...options, id } : entry,
  );
}

provideToast({ toast, update, dismiss, dismissAll, toasts: readonly(toasts) });

const regions = computed(() =>
  PLACEMENTS.map((placement) => ({
    placement,
    toasts: toasts.value.filter((entry) => entry.placement === placement),
  })).filter((region) => region.toasts.length > 0),
);

function close(entry: ToastData): void {
  dismiss(entry.id);
  entry.onClose?.();
}
</script>

<template>
  <slot />
  <Teleport v-if="mounted" to="body">
    <ToastRegion
      v-for="region in regions"
      :key="region.placement"
      :placement="region.placement"
      :label="label"
    >
      <Toast
        v-for="entry in region.toasts"
        :id="entry.id"
        :key="entry.id"
        :title="entry.title"
        :description="entry.description"
        :status="entry.status"
        :duration="entry.duration"
        :closable="entry.closable"
        @close="close(entry)"
      >
        <template v-if="entry.action" #action><component :is="entry.action" /></template>
        <template v-if="entry.icon" #icon><component :is="entry.icon" /></template>
      </Toast>
    </ToastRegion>
  </Teleport>
</template>
