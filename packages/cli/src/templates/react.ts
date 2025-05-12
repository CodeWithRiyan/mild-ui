export function getReactTemplates(component: string, typescript: boolean): Record<string, string> {
    if (component !== 'button') {
      throw new Error(`Component '${component}' is not available for React.`);
    }
  
    const extension = typescript ? 'tsx' : 'jsx';
    const indexExtension = typescript ? 'ts' : 'js';
    
    const templates: Record<string, string> = {};
    
    // Index file
    templates[`index.${indexExtension}`] = `export { default } from './Button';\n`;
    
    // Button component
    templates[`Button.${extension}`] = `
  import React from 'react';
  ${typescript ? "import { Plus, ArrowRight } from 'lucide-react';" : "// Optional: import { Plus, ArrowRight } from 'lucide-react';"}
  
  ${typescript ? `
  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
  }
  ` : ''}
  
  const Button = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    leadingIcon,
    trailingIcon,
    children,
    className = ''
  }${typescript ? ': ButtonProps' : ''}) => {
    const baseClasses = [
      'mild-button',
      \`mild-button-\${variant}\`,
      \`mild-button-\${size}\`
    ].join(' ');
    
    return (
      <button
        className={\`\${baseClasses} \${className}\`}
        disabled={disabled}
        onClick={onClick}
      >
        {leadingIcon && <span className="mild-button-icon mild-button-leading-icon">{leadingIcon}</span>}
        <span className="mild-button-content">{children}</span>
        {trailingIcon && <span className="mild-button-icon mild-button-trailing-icon">{trailingIcon}</span>}
      </button>
    );
  };
  
  export default Button;
  `;
  
    return templates;
  }