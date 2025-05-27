export function generateCssVariables(): string {
  return `
  :root {
    /* Colors */
    --mild-primary: #3b82f6;
    --mild-primary-hover: #2563eb;
    --mild-primary-active: #1d4ed8;
    --mild-secondary: #6b7280;
    --mild-secondary-hover: #4b5563;
    --mild-secondary-active: #374151;
    --mild-background: #ffffff;
    --mild-foreground: #111827;
    --mild-border: #e5e7eb;
    
    /* Typography */
    --mild-font-family: system-ui, -apple-system, sans-serif;
    --mild-font-weight-normal: 400;
    --mild-font-weight-medium: 500;
    --mild-font-weight-bold: 700;
    
    /* Spacing */
    --mild-spacing-xs: 0.25rem;
    --mild-spacing-sm: 0.5rem;
    --mild-spacing-md: 1rem;
    --mild-spacing-lg: 1.5rem;
    --mild-spacing-xl: 2rem;
    
    /* Misc */
    --mild-border-radius-sm: 0.25rem;
    --mild-border-radius-md: 0.375rem;
    --mild-border-radius-lg: 0.5rem;
  }
  
  [data-theme="dark"] {
    --mild-primary: #60a5fa;
    --mild-primary-hover: #3b82f6;
    --mild-primary-active: #2563eb;
    --mild-secondary: #9ca3af;
    --mild-secondary-hover: #6b7280;
    --mild-secondary-active: #4b5563;
    --mild-background: #111827;
    --mild-foreground: #f9fafb;
    --mild-border: #374151;
  }
  `;
}

export function generateButtonStyles(): string {
  return `
  .mild-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mild-font-family);
    font-weight: var(--mild-font-weight-medium);
    border-radius: var(--mild-border-radius-md);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  }
  
  .mild-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .mild-button-icon {
    display: inline-flex;
    align-items: center;
  }
  
  .mild-button-leading-icon {
    margin-right: var(--mild-spacing-xs);
  }
  
  .mild-button-trailing-icon {
    margin-left: var(--mild-spacing-xs);
  }
  
  /* Size variants */
  .mild-button-small {
    height: 2rem;
    padding: 0 var(--mild-spacing-sm);
    font-size: 0.875rem;
    gap: var(--mild-spacing-xs);
  }
  
  .mild-button-medium {
    height: 2.5rem;
    padding: 0 var(--mild-spacing-md);
    font-size: 1rem;
    gap: var(--mild-spacing-sm);
  }
  
  .mild-button-large {
    height: 3rem;
    padding: 0 var(--mild-spacing-lg);
    font-size: 1.125rem;
    gap: var(--mild-spacing-sm);
  }
  
  /* Variant styles */
  .mild-button-primary {
    background-color: var(--mild-primary);
    color: white;
    border: 1px solid var(--mild-primary);
  }
  
  .mild-button-primary:hover:not(:disabled) {
    background-color: var(--mild-primary-hover);
    border-color: var(--mild-primary-hover);
  }
  
  .mild-button-primary:active:not(:disabled) {
    background-color: var(--mild-primary-active);
    border-color: var(--mild-primary-active);
  }
  
  .mild-button-secondary {
    background-color: var(--mild-secondary);
    color: white;
    border: 1px solid var(--mild-secondary);
  }
  
  .mild-button-secondary:hover:not(:disabled) {
    background-color: var(--mild-secondary-hover);
    border-color: var(--mild-secondary-hover);
  }
  
  .mild-button-secondary:active:not(:disabled) {
    background-color: var(--mild-secondary-active);
    border-color: var(--mild-secondary-active);
  }
  
  .mild-button-outline {
    background-color: transparent;
    color: var(--mild-primary);
    border: 1px solid var(--mild-primary);
  }
  
  .mild-button-outline:hover:not(:disabled) {
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .mild-button-outline:active:not(:disabled) {
    background-color: rgba(59, 130, 246, 0.2);
  }
  
  .mild-button-ghost {
    background-color: transparent;
    color: var(--mild-primary);
    border: 1px solid transparent;
  }
  
  .mild-button-ghost:hover:not(:disabled) {
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  .mild-button-ghost:active:not(:disabled) {
    background-color: rgba(59, 130, 246, 0.2);
  }
  `;
}
