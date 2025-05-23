<!-- packages/svelte/src/components/Input/Input.svelte -->
<script lang="ts">
    import { cn } from '../../utils/index';
    import { inputStyles, type InputCoreProps, type InputStyleProps } from '@mild-ui/core';
    
    type $$Props = InputCoreProps & InputStyleProps & {
      value?: string;
      'on:input'?: (event: Event) => void;
      'on:focus'?: (event: FocusEvent) => void;
      'on:blur'?: (event: FocusEvent) => void;
    };
    
    export let type: $$Props['type'] = 'text';
    export let placeholder: $$Props['placeholder'] = undefined;
    export let value: $$Props['value'] = '';
    export let disabled: $$Props['disabled'] = false;
    export let readOnly: $$Props['readOnly'] = false;
    export let required: $$Props['required'] = false;
    export let error: $$Props['error'] = false;
    export let className: $$Props['className'] = '';
    export let size: $$Props['size'] = 'md';
    export let variant: $$Props['variant'] = 'default';
    export let fullWidth: $$Props['fullWidth'] = true;
    
    const inputClass = cn(
      inputStyles({ size, variant, fullWidth, error }),
      className
    );
  </script>
  
  <input
    {type}
    class={inputClass}
    {placeholder}
    value={value ?? ''}
    {disabled}
    readonly={readOnly}
    {required}
    on:input
    on:focus
    on:blur
    {...$$restProps}
  />