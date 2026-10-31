<!-- packages/vue/src/components/Select/SelectRoot.vue -->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch, type Slot } from "vue";
import { useId } from "../../composables/useId";
import { provideSelect } from "./context";
import type { SelectRootProps } from "../../types/select";

const props = withDefaults(defineProps<SelectRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  open: undefined,
  defaultOpen: false,
  disabled: false,
  required: false,
  name: undefined,
  size: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
  /** Fired when the user picks an option, controlled or not. */
  (e: "change", value: string): void;
  /** `v-model:open` */
  (e: "update:open", open: boolean): void;
}>();

const slots = defineSlots<{
  default?: () => unknown;
  /** Shown next to the selected item. Defaults to a check mark. Items can override it. */
  itemIndicator?: Slot;
}>();

const isValueControlled = computed(() => props.modelValue !== undefined);
const internalValue = ref<string | null>(props.defaultValue ?? null);
const value = computed(() =>
  isValueControlled.value ? (props.modelValue ?? null) : internalValue.value,
);

const isOpenControlled = computed(() => props.open !== undefined);
const internalOpen = ref(props.defaultOpen);
const open = computed(() => (isOpenControlled.value ? Boolean(props.open) : internalOpen.value));

const active = ref<string | null>(null);
const labels = reactive(new Map<string, Slot | undefined>());
const listboxId = useId();
const triggerRef = ref<HTMLButtonElement | null>(null);
const root = ref<HTMLDivElement | null>(null);

function setOpen(next: boolean): void {
  if (props.disabled && next) return;
  if (!isOpenControlled.value) internalOpen.value = next;
  emit("update:open", next);
}

function select(next: string): void {
  if (!isValueControlled.value) internalValue.value = next;
  emit("update:modelValue", next);
  emit("change", next);
  setOpen(false);
  triggerRef.value?.focus();
}

function registerLabel(itemValue: string, label: Slot | undefined): void {
  labels.set(itemValue, label);
}

// Clicking anywhere outside closes the popup. Wired after mount, so nothing touches
// `document` during server rendering.
function onPointerDown(event: Event): void {
  if (!root.value?.contains(event.target as Node)) setOpen(false);
}
onMounted(() => {
  watch(
    open,
    (isOpen) => {
      if (isOpen) document.addEventListener("pointerdown", onPointerDown);
      else document.removeEventListener("pointerdown", onPointerDown);
    },
    { immediate: true },
  );
});
onBeforeUnmount(() => document.removeEventListener("pointerdown", onPointerDown));

provideSelect({
  open,
  setOpen,
  value,
  select,
  active,
  setActive: (next) => {
    active.value = next;
  },
  labels,
  registerLabel,
  listboxId,
  triggerRef,
  disabled: computed(() => props.disabled),
  required: computed(() => props.required),
  size: computed(() => props.size),
  itemIndicator: computed(() => slots.itemIndicator),
});
</script>

<template>
  <div ref="root" class="mild-select" :data-state="open ? 'open' : 'closed'">
    <slot />
    <input v-if="name" type="hidden" :name="name" :value="value ?? ''" />
  </div>
</template>
