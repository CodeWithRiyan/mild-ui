// packages/core/src/theme/index.ts
/// Theme exports
/// @fileoverview Main theme exports

export * from './default-theme';
export * from './theme-utils';
export type * from './theme-provider.types';

// Re-export theme types
export type { 
  ThemeConfig, 
  ThemeColors, 
  ColorMode,
} from '../types/common';

export type {
  ThemeProviderProps,
  ThemeContextValue,
  UseThemeReturn
} from './theme-provider.types';