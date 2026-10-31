<!-- packages/vue/src/components/Radio/Radio.vue -->
<script setup lang="ts">
import RadioGroup from "./RadioGroup.vue";
import RadioGroupItem from "./RadioGroupItem.vue";
import { cn } from "../../utils/cn";
import type { RadioProps } from "../../types/radio";

/** A radio group in one go: `items` render as `RadioGroupItem`s, or compose them in the slot. */
withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  name: undefined,
  disabled: false,
  required: false,
  items: undefined,
  size: "md",
  ui: undefined,
});

const emit = defineEmits<{
  /** `v-model` */
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();
</script>

<template>
  <RadioGroup
    :model-value="modelValue"
    :default-value="defaultValue"
    :name="name"
    :disabled="disabled"
    :required="required"
    :ui="ui"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
  >
    <template v-if="items">
      <RadioGroupItem
        v-for="item in items"
        :id="item.id"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
        :size="size"
        :class="cn(item.class, ui?.items)"
      />
    </template>
    <slot v-else />
  </RadioGroup>
</template>
