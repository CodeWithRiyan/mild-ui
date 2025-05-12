export function getSvelteTemplates(component: string, typescript: boolean): Record<string, string> {
    if (component !== 'button') {
      throw new Error(`Component '${component}' is not available for Svelte.`);
    }
  
    const extension = 'svelte';
    const indexExtension = typescript ? 'ts' : 'js';
    
    const templates: Record<string, string> = {};
    
    // Index file
    templates[`index.${indexExtension}`] = `export { default } from './Button.svelte';\n`;
    
    // Button component
    templates[`Button.${extension}`] = `<script${typescript ? ' lang="ts"' : ''}>
    ${typescript ? "// Optional: import { Plus, ArrowRight } from 'lucide-svelte';" : "// Optional: import { Plus, ArrowRight } from 'lucide-svelte';"}
    
    export let variant${typescript ? ": 'primary' | 'secondary' | 'outline' | 'ghost'" : ''} = 'primary';
    export let size${typescript ? ": 'small' | 'medium' | 'large'" : ''} = 'medium';
    export let disabled${typescript ? ': boolean' : ''} = false;
    export let customClass${typescript ? ': string' : ''} = '';
    
    ${typescript ? `type $$Props = {
      variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
      size?: 'small' | 'medium' | 'large';
      disabled?: boolean;
      customClass?: string;
    }` : ''}
    
    $: baseClasses = [
      'mild-button',
      \`mild-button-\${variant}\`,
      \`mild-button-\${size}\`
    ].join(' ');
  </script>
  
  <button
    class="{baseClasses} {customClass}"
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
  </button>`;
  
    return templates;
  }