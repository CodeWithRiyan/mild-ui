<!-- packages/svelte/src/components/Radio/Radio.svelte -->
<script lang="ts">
    import { cn } from '../../utils';
    import { 
      radioStyles, 
      radioLabelStyles, 
      type RadioCoreProps, 
      type RadioStyleProps 
    } from '@mild-ui/core';
    
    type $$Props = RadioCoreProps & RadioStyleProps & {
      value?: string;
      'on:change'?: (event: Event) => void;
    };
    
    export let checked: $$Props['checked'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let required: $$Props['required'] = false;
    export let name: $$Props['name'] = undefined;
    export let value: $$Props['value'];
    export let className: $$Props['className'] = '';
    export let size: $$Props['size'] = 'md';
    
    const radioClass = cn(
      radioStyles({ size }),
      className
    );
    
    const labelClass = cn(
      radioLabelStyles({ size })
    );
  </script>
  
  <div class="flex items-center space-x-2">
    <input
      type="radio"
      class={radioClass}
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