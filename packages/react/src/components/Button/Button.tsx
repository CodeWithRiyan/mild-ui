import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ThemeColor, ThemeSize, ThemeVariant } from '@mild-ui/core';

/**
 * Button component styled with Tailwind CSS.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = 'primary',
      size = 'md',
      variant = 'filled',
      fullWidth = false,
      children,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({
          color,
          size,
          variant,
          fullWidth,
          className,
        })}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {leftIcon && !isLoading && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        
        {isLoading && loadingText ? loadingText : children}
        
        {rightIcon && !isLoading && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      color: {
        primary: 'text-white',
        secondary: 'text-white',
        success: 'text-white',
        danger: 'text-white', 
        warning: 'text-white',
        info: 'text-white',
        light: 'text-gray-900',
        dark: 'text-white',
      },
      size: {
        xs: 'text-xs px-2 py-0.5 rounded-sm h-6',
        sm: 'text-sm px-3 py-1 rounded h-8',
        md: 'text-base px-4 py-1.5 h-10',
        lg: 'text-lg px-5 py-2 h-12',
        xl: 'text-xl px-6 py-2.5 h-14',
      },
      variant: {
        filled: '',
        outlined: 'bg-transparent border',
        ghost: 'bg-transparent hover:bg-opacity-10',
        link: 'bg-transparent underline-offset-4 hover:underline',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'filled',
        className: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800',
      },
      {
        color: 'primary',
        variant: 'outlined',
        className: 'text-primary-600 border-primary-600 hover:bg-primary-50',
      },
      {
        color: 'primary',
        variant: 'ghost',
        className: 'text-primary-600 hover:bg-primary-100',
      },
      {
        color: 'primary',
        variant: 'link',
        className: 'text-primary-600 hover:text-primary-700',
      },
      {
        color: 'secondary',
        variant: 'filled',
        className: 'bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-800',
      },
      {
        color: 'secondary',
        variant: 'outlined',
        className: 'text-secondary-600 border-secondary-600 hover:bg-secondary-50',
      },
      {
        color: 'secondary',
        variant: 'ghost',
        className: 'text-secondary-600 hover:bg-secondary-100',
      },
      {
        color: 'secondary',
        variant: 'link',
        className: 'text-secondary-600 hover:text-secondary-700',
      },
      {
        color: 'success',
        variant: 'filled',
        className: 'bg-success-600 hover:bg-success-700 active:bg-success-800',
      },
      {
        color: 'success',
        variant: 'outlined',
        className: 'text-success-600 border-success-600 hover:bg-success-50',
      },
      {
        color: 'success',
        variant: 'ghost',
        className: 'text-success-600 hover:bg-success-100',
      },
      {
        color: 'success',
        variant: 'link',
        className: 'text-success-600 hover:text-success-700',
      },
      {
        color: 'danger',
        variant: 'filled',
        className: 'bg-danger-600 hover:bg-danger-700 active:bg-danger-800',
      },
      {
        color: 'danger',
        variant: 'outlined',
        className: 'text-danger-600 border-danger-600 hover:bg-danger-50',
      },
      {
        color: 'danger',
        variant: 'ghost',
        className: 'text-danger-600 hover:bg-danger-100',
      },
      {
        color: 'danger',
        variant: 'link',
        className: 'text-danger-600 hover:text-danger-700',
      },
      {
        color: 'info',
        variant: 'filled',
        className: 'bg-info-600 hover:bg-info-700 active:bg-info-800',
      },
      {
        color: 'info',
        variant: 'outlined',
        className: 'text-info-600 border-info-600 hover:bg-info-50',
      },
      {
        color: 'info',
        variant: 'ghost',
        className: 'text-info-600 hover:bg-info-100',
      },
      {
        color: 'info',
        variant: 'link',
        className: 'text-info-600 hover:text-info-700',
      },
      {
        color: 'light',
        variant: 'filled',
        className: 'bg-light-200 hover:bg-light-300 active:bg-light-400 text-gray-900',
      },
      {
        color: 'light',
        variant: 'outlined',
        className: 'text-gray-800 border-gray-300 hover:bg-light-100',
      },
      {
        color: 'light',
        variant: 'ghost',
        className: 'text-gray-800 hover:bg-light-100',
      },
      {
        color: 'light',
        variant: 'link',
        className: 'text-gray-800 hover:text-gray-900',
      },
      {
        color: 'dark',
        variant: 'filled',
        className: 'bg-gray-800 hover:bg-gray-900 active:bg-gray-950',
      },
      {
        color: 'dark',
        variant: 'outlined',
        className: 'text-gray-800 border-gray-800 hover:bg-gray-100',
      },
      {
        color: 'dark',
        variant: 'ghost',
        className: 'text-gray-800 hover:bg-gray-100',
      },
      {
        color: 'dark',
        variant: 'link',
        className: 'text-gray-800 hover:text-gray-900',
      },
    ],
    defaultVariants: {
      color: 'primary',
      size: 'md',
      variant: 'filled',
      fullWidth: false,
    },
  }
);

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  /**
   * The button's color
   * @default 'primary'
   */
  color?: ThemeColor;
  
  /**
   * The button's size
   * @default 'md'
   */
  size?: ThemeSize;
  
  /**
   * The button's variant
   * @default 'filled'
   */
  variant?: ThemeVariant;
  
  /**
   * Whether the button should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * The content of the button
   */
  children?: React.ReactNode;
  
  /**
   * Optional left icon
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Optional right icon
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Text to show when loading
   */
  loadingText?: string;

  /**
   * Additional class names
   */
  className?: string;
}