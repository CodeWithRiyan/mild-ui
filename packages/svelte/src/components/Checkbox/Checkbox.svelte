<!-- packages/svelte/src/components/Checkbox/Checkbox.svelte -->
<script lang="ts">
    import { cn } from '../../utils';
    import { 
      checkboxStyles, 
      checkboxLabelStyles, 
      type CheckboxCoreProps, 
      type CheckboxStyleProps 
    } from '@mild-ui/core';
    
    type $$Props = CheckboxCoreProps & CheckboxStyleProps & {
      value?: string;
      'on:change'?: (event: Event) => void;
    };
    
    export let checked: $$Props['checked'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let required: $$Props['required'] = false;
    export let name: $$Props['name'] = undefined;
    export let value: $$Props['value'] = undefined;
    export let indeterminate: $$Props['indeterminate'] = false;
    export let className: $$Props['className'] = '';
    export let size: $$Props['size'] = 'md';
    
    const checkboxClass = cn(
      checkboxStyles({ size }),
      className
    );
    
    const labelClass = cn(
      checkboxLabelStyles({ size })
    );
    
    $: if (indeterminate !== undefined) {
      if (typeof document !== 'undefined') {
        const element = document.getElementById($$restProps.id ?? '');
        if (element && element instanceof HTMLInputElement) {
          element.indeterminate = indeterminate;
        }
      }
    }
  </script>
  
  <div class="flex items-center space-x-2">
    <input
      type="checkbox"
      class={checkboxClass}
      {checked}
      {disabled}
      {required}
      {name}
      {value}
      on:change
      {...$$restProps}
    />
    {#if $$slots.default}
      <slot />
    {/if}
  </div>