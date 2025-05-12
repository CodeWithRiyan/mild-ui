<script lang="ts">
    import { getButtonAttributes, type ButtonVariant, type ButtonSize } from '@mild-ui/core';
    
    export let variant: ButtonVariant = 'primary';
    export let size: ButtonSize = 'medium';
    export let disabled: boolean = false;
    export let customClass: string = '';
    
    $: buttonAttrs = getButtonAttributes({ variant, size, disabled });
    $: classes = `${buttonAttrs.className} ${customClass}`;
  </script>
  
  <button
    class={classes}
    {disabled}
    on:click
  >
    {#if $$slots['leading-icon']}
      <span class="mild-button-icon mild-button-leading-icon">
        <slot name="leading-icon" />
      </span>
    {/if}
    
    <span class="mild-button-content">
      <slot />
    </span>
    
    {#if $$slots['trailing-icon']}
      <span class="mild-button-icon mild-button-trailing-icon">
        <slot name="trailing-icon" />
      </span>
    {/if}
  </button>