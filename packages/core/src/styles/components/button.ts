export const generateButtonStyles = () => {
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
  };