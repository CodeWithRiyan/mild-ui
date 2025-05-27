<!-- packages/vue/src/components/Select/Select.vue -->
<template>
  <div class="relative">
    <button
      type="button"
      :class="triggerClasses"
      :disabled="disabled"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="onKeyDown"
    >
      <span v-if="selectedOption">{{ selectedOption.label }}</span>
      <span v-else-if="placeholder" class="text-muted-foreground">{{
        placeholder
      }}</span>
      <div class="ml-auto h-4 w-4">
        <ChevronDown class="h-4 w-4" />
      </div>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md"
        role="listbox"
        tabindex="-1"
        @blur="close"
        @keydown="onKeyDown"
      >
        <div
          v-for="option in options"
          :key="option.value"
          :class="[
            selectItemClasses,
            option.value === props.value
              ? 'bg-accent text-accent-foreground'
              : '',
            option.disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer',
          ]"
          role="option"
          :aria-selected="option.value === props.value"
          :aria-disabled="option.disabled"
          @click="selectOption(option)"
        >
          <span
            class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
          >
            <Check v-if="option.value === props.value" class="h-4 w-4" />
          </span>
          <span>{{ option.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from "vue";
import { Check, ChevronDown } from "lucide-vue-next";
import {
  type SelectCoreProps,
  type SelectStyleProps,
  type SelectOption,
  selectTriggerStyles,
  selectItemStyles,
  Keys,
} from "@mild-ui/core";
import { cn } from "../../utils";

interface Props extends SelectCoreProps, SelectStyleProps {}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  fullWidth: true,
  error: false,
  disabled: false,
  options: () => [],
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "focus"): void;
  (e: "blur"): void;
}>();

const isOpen = ref(false);

const triggerClasses = computed(() => {
  return cn(
    selectTriggerStyles({
      size: props.size,
      fullWidth: props.fullWidth,
      error: props.error,
    }),
    props.className,
  );
});

const selectItemClasses = computed(() => {
  return cn(selectItemStyles({ size: props.size }));
});

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.value);
});

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit("focus");
  } else {
    emit("blur");
  }
};

const close = () => {
  isOpen.value = false;
  emit("blur");
};

const selectOption = (option: SelectOption) => {
  if (option.disabled) return;
  emit("update:modelValue", option.value);
  close();
};

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === Keys.Escape) {
    close();
  }
  // Implement additional keyboard navigation as needed
};

// Close when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (!event.composedPath().includes(event.currentTarget as HTMLElement)) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
