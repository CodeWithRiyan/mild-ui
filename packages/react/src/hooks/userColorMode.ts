// packages/react/src/hooks/useColorMode.ts
import { useTheme } from '../providers/ThemeProvider';

/**
 * Hook for managing color mode
 * @returns Color mode utilities
 */
export const useColorMode = () => {
  const { colorMode, setColorMode, toggleColorMode, resolvedColorMode, isDark, isLight, isSystem } = useTheme();
  
  return {
    colorMode,
    setColorMode,
    toggleColorMode,
    resolvedColorMode,
    isDark,
    isLight,
    isSystem,
  };
};