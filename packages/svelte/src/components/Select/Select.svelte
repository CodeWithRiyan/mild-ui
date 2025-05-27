<!-- packages/svelte/src/components/Select/Select.svelte -->
<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Check, ChevronDown } from 'lucide-svelte';
    import { cn } from '../../utils';
    import { 
      type SelectCoreProps, 
      type SelectStyleProps, 
      type SelectOption, 
      selectTriggerStyles, 
      selectItemStyles, 
      Keys 
    } from '@mild-ui/core';
    
    type $$Props = SelectCoreProps & SelectStyleProps & {
      value?: string;
      'on:change'?: (event: Event) => void;
    };
    
    export let value: $$Props['value'] = undefined;
    export let placeholder: $$Props['placeholder'] = undefined;
    export let disabled: $$Props['disabled'] = false;
    export let options: $$Props['options'] = [];
    export let className: $$Props['className'] = '';
    export let size: $$Props['size'] = 'md';
    export let fullWidth: $$Props['fullWidth'] = true;
    export let error: $$Props['error'] = false;
    
    let isOpen = false;
    let selectTriggerRef: HTMLButtonElement;
    let selectListRef: HTMLDivElement;
    
    const dispatch = createEventDispatcher<{
      change: string;
    }>();
    
    const triggerClass = cn(
      selectTriggerStyles({ size, fullWidth, error }),
      className
    );
    
    const itemClass = cn(
      selectItemStyles({ size })
    );
    
    $: selectedOption = options?.find(option => option.value === value);
    
    function toggle() {
      if (disabled) return;
      isOpen = !isOpen;
    }
    
    function close() {
      isOpen = false;
    }
    
    function selectOption(option: SelectOption) {
      if (option.disabled) return;
      value = option.value;
      dispatch('change', option.value);
      close();
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === Keys.Escape) {
        close();
      }
      // Implement additional keyboard navigation as needed
    }
    
    function handleClickOutside(event: MouseEvent) {
      if (
        selectTriggerRef && 
        selectListRef && 
        !selectTriggerRef.contains(event.target as Node) && 
        !selectListRef.contains(event.target as Node)
      ) {
        close();
      }
    }
    
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
    });
    
    onDestroy(() => {
      document.removeEventListener('click', handleClickOutside);
    });
  </script>
  
  <div class="relative">
    <button
      bind:this={selectTriggerRef}
      type="button"
      class={triggerClass}
      {disabled}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      on:click={toggle}
      on:keydown={handleKeyDown}
    >
      {#if selectedOption}
        {selectedOption.label}
      {:else if placeholder}
        <span class="text-muted-foreground">{placeholder}</span>
      {/if}
      <div class="ml-auto h-4 w-4">
        <ChevronDown size={16} />
      </div>
    </button>
    
    {#if isOpen}
      <div
        bind:this={selectListRef}
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80"
        role="listbox"
        tabindex="-1"
        on:keydown={handleKeyDown}
      >
        {#each options || [] as option (option.value)}
          <button
            type="button"
            tabindex={option.disabled ? -1 : 0}
            class={cn(
              itemClass,
              option.value === value ? 'bg-accent text-accent-foreground' : '',
              option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            )}
            role="option"
            aria-selected={option.value === value}
            aria-disabled={option.disabled}
            on:click={() => selectOption(option)}
          >
            <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
              {#if option.value === value}
                <Check size={16} />
              {/if}
            </span>
            <span>{option.label}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>