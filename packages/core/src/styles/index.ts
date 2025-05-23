export const generateCssVariables = () => {
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
  };
  