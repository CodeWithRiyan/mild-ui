import { ButtonBaseProps } from './Button.types';
import { getButtonClasses } from './Button.styles';

export const getButtonAttributes = (props: ButtonBaseProps) => {
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';
  const disabled = props.disabled || false;
  
  return {
    className: getButtonClasses(variant, size),
    disabled,
    variant,
    size
  };
};