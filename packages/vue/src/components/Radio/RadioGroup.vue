<!-- packages/vue/src/components/Radio/RadioGroup.vue -->
<template>
  <div class="space-y-2">
    <slot :value="modelValue" :update:value="onChange" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  name?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onChange = (value: string) => {
  emit("update:modelValue", value);
};
</script>
