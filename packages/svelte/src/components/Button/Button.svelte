<!-- packages/svelte/src/components/Button/Button.svelte -->
<script lang="ts">
  import { getButtonProps } from '@mild-ui/core';
  import type { ButtonVariant, ButtonSize } from '@mild-ui/core';
  
  export let variant: ButtonVariant = 'primary';
  export let size: ButtonSize = 'md';
  export let disabled: boolean = false;
  // Change 'class' to 'className' to avoid using the reserved keyword
  export let className: string = '';
  
  $: buttonAttrs = getButtonProps({ 
    variant, 
    size, 
    disabled, 
    className 
  });
</script>

<button
  class={buttonAttrs.className}
  {disabled}
  on:click
  {...$$restProps}
>
  {#if $$slots['leading-icon']}
    <span class="mr-2">
      <slot name="leading-icon" />
    </span>
  {/if}
  
  <slot />
  
  {#if $$slots['trailing-icon']}
    <span class="ml-2">
      <slot name="trailing-icon" />
    </span>
  {/if}
</button>