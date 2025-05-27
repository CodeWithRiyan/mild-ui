// packages/core/src/components/Radio/Radio.types.ts
export interface RadioCoreProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value: string;
    className?: string;
  }
  
  export type RadioSize = 'sm' | 'md' | 'lg';
  
  export interface RadioStyleProps {
    size?: RadioSize;
  }