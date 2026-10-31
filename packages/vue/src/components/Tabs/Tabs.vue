<!-- packages/vue/src/components/Tabs/Tabs.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "../../utils/cn";
import { useId } from "../../composables/useId";
import { provideTabs } from "./context";
import type { TabsProps } from "../../types/tabs";

// Tabs root: owns the selected value and hands it to `TabsList`/`TabsTrigger`/`TabsContent`.
// Behaviour (`aria-selected`, one tab stop, Arrow/Home/End keys, automatic or manual
// activation) comes from `@mild-ui/primitives/tabs`, bound by `TabsList`.
const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  variant: "default",
  size: "md",
  orientation: "horizontal",
  activation: "automatic",
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

const isControlled = computed(() => props.modelValue !== undefined);
const internal = ref<string | null>(props.defaultValue ?? null);
// Controlled means `modelValue` is defined, so the cast only narrows the type.
const value = computed(() => (isControlled.value ? (props.modelValue as string) : internal.value));

function select(next: string): void {
  if (!isControlled.value) internal.value = next;
  emit("update:modelValue", next);
  emit("change", next);
}

provideTabs({
  value,
  baseId: useId(),
  select,
  variant: computed(() => props.variant),
  size: computed(() => props.size),
  orientation: computed(() => props.orientation),
  activation: computed(() => props.activation),
});

const classes = computed(() =>
  cn("mild-tabs", props.orientation === "vertical" && "mild-tabs--vertical"),
);
</script>

<template>
  <div :data-orientation="orientation" :class="classes"><slot /></div>
</template>
