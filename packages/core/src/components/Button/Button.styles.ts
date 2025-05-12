import { ButtonVariant, ButtonSize } from './Button.types';

export const buttonBaseClass = 'mild-button';

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'mild-button-primary',
  secondary: 'mild-button-secondary',
  outline: 'mild-button-outline',
  ghost: 'mild-button-ghost'
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  small: 'mild-button-small',
  medium: 'mild-button-medium',
  large: 'mild-button-large'
};

export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'medium'
): string => {
  return [
    buttonBaseClass,
    buttonVariantClasses[variant],
    buttonSizeClasses[size]
  ].join(' ');
};