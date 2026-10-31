<!-- packages/vue/src/components/Select/Select.vue -->
<script setup lang="ts">
import SelectRoot from "./SelectRoot.vue";
import SelectTrigger from "./SelectTrigger.vue";
import SelectValue from "./SelectValue.vue";
import SelectContent from "./SelectContent.vue";
import SelectItem from "./SelectItem.vue";
import type { SelectProps } from "../../types/select";

// Attributes (class, aria-*, data-*) go on the trigger button, the focusable control.
defineOptions({ inheritAttrs: false });

withDefaults(defineProps<SelectProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  open: undefined,
  defaultOpen: false,
  placeholder: undefined,
  disabled: false,
  required: false,
  name: undefined,
  id: undefined,
  options: () => [],
  size: undefined,
  fullWidth: false,
  error: false,
  ui: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  /** `v-model:open` */
  (e: "update:open", open: boolean): void;
}>();

defineSlots<{
  /** Shown in the trigger after the value. Defaults to a chevron. */
  icon?: () => unknown;
  /** Shown next to the selected item. Defaults to a check mark. */
  itemIndicator?: () => unknown;
}>();

// Template notes
// Composite: one component for the common case (`options` + v-model). Compose SelectRoot,
// SelectTrigger, SelectValue, SelectContent and SelectItem yourself for anything else.
</script>

<template>
  <SelectRoot
    :model-value="modelValue"
    :default-value="defaultValue"
    :open="open"
    :default-open="defaultOpen"
    :name="name"
    :disabled="disabled"
    :required="required"
    :size="size"
    :class="ui?.root"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
    @update:open="emit('update:open', $event)"
  >
    <template v-if="$slots.itemIndicator" #itemIndicator><slot name="itemIndicator" /></template>
    <SelectTrigger
      :id="id"
      :full-width="fullWidth"
      :error="error"
      :class="ui?.trigger"
      :ui="{ icon: ui?.icon }"
      v-bind="$attrs"
    >
      <SelectValue :placeholder="placeholder" :class="ui?.value" />
      <template v-if="$slots.icon" #icon><slot name="icon" /></template>
    </SelectTrigger>
    <SelectContent :class="ui?.content">
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :class="ui?.item"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>
