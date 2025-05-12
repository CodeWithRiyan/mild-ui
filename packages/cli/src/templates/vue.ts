export function getVueTemplates(component: string, typescript: boolean): Record<string, string> {
    if (component !== 'button') {
      throw new Error(`Component '${component}' is not available for Vue.`);
    }
  
    const extension = 'vue';
    const indexExtension = typescript ? 'ts' : 'js';
    
    const templates: Record<string, string> = {};
    
    // Index file
    templates[`index.${indexExtension}`] = `export { default } from './Button.vue';\n`;
    
    // Button component
    templates[`Button.${extension}`] = `<template>
    <button
      :class="[baseClasses, customClass]"
      :disabled="disabled"
      @click="onClick"
    >
      <span v-if="$slots['leading-icon']" class="mild-button-icon mild-button-leading-icon">
        <slot name="leading-icon"></slot>
      </span>
      <span class="mild-button-content">
        <slot></slot>
      </span>
      <span v-if="$slots['trailing-icon']" class="mild-button-icon mild-button-trailing-icon">
        <slot name="trailing-icon"></slot>
      </span>
    </button>
  </template>
  
  <script ${typescript ? 'setup lang="ts"' : 'setup'}>
  ${typescript ? "// Optional: import { PlusIcon, ArrowRightIcon } from 'lucide-vue-next';" : "// Optional: import { PlusIcon, ArrowRightIcon } from 'lucide-vue-next';"}
  
  ${typescript ? `
  type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
  type ButtonSize = 'small' | 'medium' | 'large';
  
  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    customClass?: string;
  }
  ` : ''}
  
  ${typescript ? 'const props = withDefaults(defineProps<Props>(), {' : 'const props = defineProps({'}
    variant: ${typescript ? "'primary'" : "{ type: String, default: 'primary' }"},
    size: ${typescript ? "'medium'" : "{ type: String, default: 'medium' }"},
    disabled: ${typescript ? 'false' : '{ type: Boolean, default: false }'},
    customClass: ${typescript ? "''" : "{ type: String, default: '' }"}
  });
  
  ${typescript ? 'const emit = defineEmits<{\n  (e: \'click\', event: MouseEvent): void;\n}>();' : 'const emit = defineEmits(["click"]);'}
  
  import { computed } from 'vue';
  
  const baseClasses = computed(() => {
    return [
      'mild-button',
      \`mild-button-\${props.variant}\`,
      \`mild-button-\${props.size}\`
    ].join(' ');
  });
  
  const onClick = (event${typescript ? ': MouseEvent' : ''}) => {
    emit('click', event);
  };
  </script>`;
  
    return templates;
  }