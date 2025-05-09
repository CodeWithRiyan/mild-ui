/**
 * Theme constants for mild-ui
 */

export type ThemeColor = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export type ThemeSize = 
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type ThemeVariant = 
  | 'filled'
  | 'outlined'
  | 'ghost'
  | 'link';

export type ThemeRadius = 
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

export type ThemeShadow = 
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export const THEME_COLORS: ThemeColor[] = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
];

export const THEME_SIZES: ThemeSize[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
];

export const THEME_VARIANTS: ThemeVariant[] = [
  'filled',
  'outlined',
  'ghost',
  'link'
];

export const THEME_RADIUSES: ThemeRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full'
];

export const THEME_SHADOWS: ThemeShadow[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
];