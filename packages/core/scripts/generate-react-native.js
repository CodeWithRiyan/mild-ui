const fs = require("fs").promises;
const path = require("path");

/**
 * Converts mild-ui design tokens to React Native StyleSheet format
 */
async function generateReactNativeStyles() {
  try {
    console.log("📱 Generating React Native styles...");

    // Read design tokens
    const tokensPath = path.join(__dirname, "../dist/tokens.json");
    const tokensData = await fs.readFile(tokensPath, "utf-8");
    const tokens = JSON.parse(tokensData);

    // Create React Native theme structure
    const reactNativeTheme = generateReactNativeTheme(tokens);
    const reactNativeUtils = generateReactNativeUtils(tokens);
    const reactNativeTypes = generateReactNativeTypes(tokens);
    
    // Ensure dist directory exists
    await fs.mkdir("dist/react-native", { recursive: true });

    // Write React Native files
    await fs.writeFile("dist/react-native/MildTheme.js", reactNativeTheme);
    console.log("✅ Generated React Native theme: dist/react-native/MildTheme.js");

    await fs.writeFile("dist/react-native/MildUtils.js", reactNativeUtils);
    console.log("✅ Generated React Native utilities: dist/react-native/MildUtils.js");

    await fs.writeFile("dist/react-native/MildTheme.d.ts", reactNativeTypes);
    console.log("✅ Generated React Native types: dist/react-native/MildTheme.d.ts");

    // Generate TypeScript versions
    const reactNativeThemeTS = generateReactNativeThemeTS(tokens);
    const reactNativeUtilsTS = generateReactNativeUtilsTS(tokens);
    
    await fs.writeFile("dist/react-native/MildTheme.ts", reactNativeThemeTS);
    console.log("✅ Generated React Native theme (TS): dist/react-native/MildTheme.ts");

    await fs.writeFile("dist/react-native/MildUtils.ts", reactNativeUtilsTS);
    console.log("✅ Generated React Native utilities (TS): dist/react-native/MildUtils.ts");

    // Generate README for React Native usage
    const reactNativeReadme = generateReactNativeReadme();
    await fs.writeFile("dist/react-native/README.md", reactNativeReadme);
    console.log("✅ Generated React Native README: dist/react-native/README.md");

    console.log("🎉 React Native styles generation completed!");
  } catch (error) {
    console.error("❌ React Native styles generation failed:", error);
    process.exit(1);
  }
}

function generateReactNativeTheme(tokens) {
  return `// Generated by mild-ui/core
// DO NOT EDIT - This file is auto-generated

/**
 * Mild UI Theme for React Native
 * 
 * A comprehensive design system with colors, typography, and spacing
 * matching the mild-ui web design system.
 */

// Color Palettes
export const colors = {
  primary: {
    50: '${tokens.colors.primary["50"]}',
    100: '${tokens.colors.primary["100"]}',
    200: '${tokens.colors.primary["200"]}',
    300: '${tokens.colors.primary["300"]}',
    400: '${tokens.colors.primary["400"]}',
    500: '${tokens.colors.primary["500"]}',
    600: '${tokens.colors.primary["600"]}',
    700: '${tokens.colors.primary["700"]}',
    800: '${tokens.colors.primary["800"]}',
    900: '${tokens.colors.primary["900"]}',
  },
  gray: {
    50: '${tokens.colors.gray["50"]}',
    100: '${tokens.colors.gray["100"]}',
    200: '${tokens.colors.gray["200"]}',
    300: '${tokens.colors.gray["300"]}',
    400: '${tokens.colors.gray["400"]}',
    500: '${tokens.colors.gray["500"]}',
    600: '${tokens.colors.gray["600"]}',
    700: '${tokens.colors.gray["700"]}',
    800: '${tokens.colors.gray["800"]}',
    900: '${tokens.colors.gray["900"]}',
  },
};

// Semantic colors
export const semanticColors = {
  light: {
    background: colors.gray[50],      // ${tokens.colors.gray["50"]}
    foreground: colors.gray[900],     // ${tokens.colors.gray["900"]}
    muted: colors.gray[100],          // ${tokens.colors.gray["100"]}
    mutedForeground: colors.gray[500], // ${tokens.colors.gray["500"]}
    border: colors.gray[200],         // ${tokens.colors.gray["200"]}
    primary: colors.primary[500],     // ${tokens.colors.primary["500"]}
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    border: '#262626',
    primary: colors.primary[400],     // ${tokens.colors.primary["400"]}
  },
};

// Spacing scale (converted from rem to React Native points)
export const spacing = {
  0: 0,      // ${tokens.spacing["0"]}
  1: 4,      // ${tokens.spacing["1"]} -> 0.25rem
  2: 8,      // ${tokens.spacing["2"]} -> 0.5rem
  3: 12,     // ${tokens.spacing["3"]} -> 0.75rem
  4: 16,     // ${tokens.spacing["4"]} -> 1rem
  5: 20,     // ${tokens.spacing["5"]} -> 1.25rem
  6: 24,     // ${tokens.spacing["6"]} -> 1.5rem
  8: 32,     // ${tokens.spacing["8"]} -> 2rem
  10: 40,    // ${tokens.spacing["10"]} -> 2.5rem
  12: 48,    // ${tokens.spacing["12"]} -> 3rem
  16: 64,    // ${tokens.spacing["16"]} -> 4rem
  20: 80,    // ${tokens.spacing["20"]} -> 5rem
  24: 96,    // ${tokens.spacing["24"]} -> 6rem
};

// Typography scale (converted from rem to React Native points)
export const typography = {
  fontSize: {
    xs: 12,    // ${tokens.fontSize.xs} -> 0.75rem
    sm: 14,    // ${tokens.fontSize.sm} -> 0.875rem
    base: 16,  // ${tokens.fontSize.base} -> 1rem
    lg: 18,    // ${tokens.fontSize.lg} -> 1.125rem
    xl: 20,    // ${tokens.fontSize.xl} -> 1.25rem
    '2xl': 24, // ${tokens.fontSize["2xl"]} -> 1.5rem
    '3xl': 30, // ${tokens.fontSize["3xl"]} -> 1.875rem
    '4xl': 36, // ${tokens.fontSize["4xl"]} -> 2.25rem
  },
  fontWeight: {
    normal: '400',    // ${tokens.fontWeight.normal}
    medium: '500',    // ${tokens.fontWeight.medium}
    semibold: '600',  // ${tokens.fontWeight.semibold}
    bold: '700',      // ${tokens.fontWeight.bold}
  },
  lineHeight: {
    xs: 16,    // 1.33x of fontSize.xs
    sm: 20,    // 1.43x of fontSize.sm
    base: 24,  // 1.5x of fontSize.base
    lg: 28,    // 1.56x of fontSize.lg
    xl: 28,    // 1.4x of fontSize.xl
    '2xl': 32, // 1.33x of fontSize.2xl
    '3xl': 36, // 1.2x of fontSize.3xl
    '4xl': 40, // 1.11x of fontSize.4xl
  },
};

// Border radius scale
export const borderRadius = {
  none: 0,    // ${tokens.borderRadius.none}
  sm: 2,      // ${tokens.borderRadius.sm} -> 0.125rem
  base: 4,    // ${tokens.borderRadius.base} -> 0.25rem
  md: 6,      // ${tokens.borderRadius.md} -> 0.375rem
  lg: 8,      // ${tokens.borderRadius.lg} -> 0.5rem
  xl: 12,     // ${tokens.borderRadius.xl} -> 0.75rem
  '2xl': 16,  // ${tokens.borderRadius["2xl"]} -> 1rem
  full: 999,  // ${tokens.borderRadius.full}
};

// Shadow presets
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
};

// Complete theme object
export const MildTheme = {
  colors,
  semanticColors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export default MildTheme;
`;
}

function generateReactNativeUtils(tokens) {
  return `// Generated by mild-ui/core
// DO NOT EDIT - This file is auto-generated
import { StyleSheet } from 'react-native';
import { MildTheme } from './MildTheme';

/**
 * Mild UI Utility StyleSheets for React Native
 * 
 * Provides Tailwind-like utility styles for React Native
 * matching the mild-ui web utility classes.
 */

// Layout utilities (equivalent to mild-flex, mild-items-center, etc.)
export const layout = StyleSheet.create({
  // Display flex
  flex: {
    display: 'flex',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  
  // Justify content
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  
  // Align items
  itemsStart: {
    alignItems: 'flex-start',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  itemsStretch: {
    alignItems: 'stretch',
  },
  
  // Flex grow/shrink
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
});

// Spacing utilities (equivalent to mild-p-*, mild-m-*, etc.)
export const spacing = StyleSheet.create({
  // Padding all
  p0: { padding: MildTheme.spacing[0] },
  p1: { padding: MildTheme.spacing[1] },
  p2: { padding: MildTheme.spacing[2] },
  p3: { padding: MildTheme.spacing[3] },
  p4: { padding: MildTheme.spacing[4] },
  p5: { padding: MildTheme.spacing[5] },
  p6: { padding: MildTheme.spacing[6] },
  p8: { padding: MildTheme.spacing[8] },
  
  // Padding horizontal
  px1: { paddingHorizontal: MildTheme.spacing[1] },
  px2: { paddingHorizontal: MildTheme.spacing[2] },
  px3: { paddingHorizontal: MildTheme.spacing[3] },
  px4: { paddingHorizontal: MildTheme.spacing[4] },
  px6: { paddingHorizontal: MildTheme.spacing[6] },
  
  // Padding vertical
  py1: { paddingVertical: MildTheme.spacing[1] },
  py2: { paddingVertical: MildTheme.spacing[2] },
  py3: { paddingVertical: MildTheme.spacing[3] },
  py4: { paddingVertical: MildTheme.spacing[4] },
  py6: { paddingVertical: MildTheme.spacing[6] },
  
  // Margin all
  m0: { margin: MildTheme.spacing[0] },
  m1: { margin: MildTheme.spacing[1] },
  m2: { margin: MildTheme.spacing[2] },
  m3: { margin: MildTheme.spacing[3] },
  m4: { margin: MildTheme.spacing[4] },
  m6: { margin: MildTheme.spacing[6] },
  
  // Margin horizontal
  mx1: { marginHorizontal: MildTheme.spacing[1] },
  mx2: { marginHorizontal: MildTheme.spacing[2] },
  mx4: { marginHorizontal: MildTheme.spacing[4] },
  
  // Margin vertical
  my1: { marginVertical: MildTheme.spacing[1] },
  my2: { marginVertical: MildTheme.spacing[2] },
  my4: { marginVertical: MildTheme.spacing[4] },
});

// Typography utilities (equivalent to mild-text-*, mild-font-*, etc.)
export const typography = StyleSheet.create({
  // Font sizes
  textXs: {
    fontSize: MildTheme.typography.fontSize.xs,
    lineHeight: MildTheme.typography.lineHeight.xs,
  },
  textSm: {
    fontSize: MildTheme.typography.fontSize.sm,
    lineHeight: MildTheme.typography.lineHeight.sm,
  },
  textBase: {
    fontSize: MildTheme.typography.fontSize.base,
    lineHeight: MildTheme.typography.lineHeight.base,
  },
  textLg: {
    fontSize: MildTheme.typography.fontSize.lg,
    lineHeight: MildTheme.typography.lineHeight.lg,
  },
  textXl: {
    fontSize: MildTheme.typography.fontSize.xl,
    lineHeight: MildTheme.typography.lineHeight.xl,
  },
  text2xl: {
    fontSize: MildTheme.typography.fontSize['2xl'],
    lineHeight: MildTheme.typography.lineHeight['2xl'],
  },
  
  // Font weights
  fontNormal: {
    fontWeight: MildTheme.typography.fontWeight.normal,
  },
  fontMedium: {
    fontWeight: MildTheme.typography.fontWeight.medium,
  },
  fontSemibold: {
    fontWeight: MildTheme.typography.fontWeight.semibold,
  },
  fontBold: {
    fontWeight: MildTheme.typography.fontWeight.bold,
  },
  
  // Text alignment
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
});

// Color utilities for light theme (equivalent to mild-text-*, mild-bg-*, etc.)
export const colorsLight = StyleSheet.create({
  // Text colors
  textPrimary: { color: MildTheme.semanticColors.light.primary },
  textForeground: { color: MildTheme.semanticColors.light.foreground },
  textMuted: { color: MildTheme.semanticColors.light.mutedForeground },
  textGray600: { color: MildTheme.colors.gray[600] },
  textGray900: { color: MildTheme.colors.gray[900] },
  textWhite: { color: '#ffffff' },
  
  // Background colors
  bgPrimary: { backgroundColor: MildTheme.semanticColors.light.primary },
  bgBackground: { backgroundColor: MildTheme.semanticColors.light.background },
  bgMuted: { backgroundColor: MildTheme.semanticColors.light.muted },
  bgWhite: { backgroundColor: '#ffffff' },
  bgGray100: { backgroundColor: MildTheme.colors.gray[100] },
  bgGray200: { backgroundColor: MildTheme.colors.gray[200] },
  
  // Border colors
  borderDefault: { borderColor: MildTheme.semanticColors.light.border },
  borderPrimary: { borderColor: MildTheme.semanticColors.light.primary },
  borderGray200: { borderColor: MildTheme.colors.gray[200] },
});

// Color utilities for dark theme
export const colorsDark = StyleSheet.create({
  // Text colors
  textPrimary: { color: MildTheme.semanticColors.dark.primary },
  textForeground: { color: MildTheme.semanticColors.dark.foreground },
  textMuted: { color: MildTheme.semanticColors.dark.mutedForeground },
  textGray600: { color: '#d4d4d8' }, // Adjusted for dark mode
  textGray900: { color: '#fafafa' }, // Adjusted for dark mode
  textWhite: { color: '#ffffff' },
  
  // Background colors
  bgPrimary: { backgroundColor: MildTheme.semanticColors.dark.primary },
  bgBackground: { backgroundColor: MildTheme.semanticColors.dark.background },
  bgMuted: { backgroundColor: MildTheme.semanticColors.dark.muted },
  bgWhite: { backgroundColor: MildTheme.semanticColors.dark.muted }, // Adjusted for dark mode
  bgGray100: { backgroundColor: '#27272a' }, // Adjusted for dark mode
  bgGray200: { backgroundColor: '#3f3f46' }, // Adjusted for dark mode
  
  // Border colors
  borderDefault: { backgroundColor: MildTheme.semanticColors.dark.border },
  borderPrimary: { backgroundColor: MildTheme.semanticColors.dark.primary },
  borderGray200: { backgroundColor: '#3f3f46' }, // Adjusted for dark mode
});

// Border and radius utilities (equivalent to mild-border, mild-radius-*, etc.)
export const borders = StyleSheet.create({
  // Border width
  border: { borderWidth: 1 },
  border2: { borderWidth: 2 },
  borderT: { borderTopWidth: 1 },
  borderR: { borderRightWidth: 1 },
  borderB: { borderBottomWidth: 1 },
  borderL: { borderLeftWidth: 1 },
  
  // Border radius
  roundedNone: { borderRadius: MildTheme.borderRadius.none },
  roundedSm: { borderRadius: MildTheme.borderRadius.sm },
  rounded: { borderRadius: MildTheme.borderRadius.base },
  roundedMd: { borderRadius: MildTheme.borderRadius.md },
  roundedLg: { borderRadius: MildTheme.borderRadius.lg },
  roundedXl: { borderRadius: MildTheme.borderRadius.xl },
  rounded2xl: { borderRadius: MildTheme.borderRadius['2xl'] },
  roundedFull: { borderRadius: MildTheme.borderRadius.full },
});

// Shadow utilities (equivalent to mild-shadow-*, etc.)
export const shadows = StyleSheet.create({
  shadowSm: MildTheme.shadows.sm,
  shadow: MildTheme.shadows.base,
  shadowMd: MildTheme.shadows.md,
  shadowLg: MildTheme.shadows.lg,
  shadowXl: MildTheme.shadows.xl,
});

// Position utilities
export const position = StyleSheet.create({
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  
  // Top/Right/Bottom/Left
  top0: { top: 0 },
  right0: { right: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  
  inset0: { top: 0, right: 0, bottom: 0, left: 0 },
});

// Size utilities
export const sizing = StyleSheet.create({
  // Width
  w8: { width: MildTheme.spacing[8] },
  w12: { width: MildTheme.spacing[12] },
  w16: { width: MildTheme.spacing[16] },
  w20: { width: MildTheme.spacing[20] },
  w24: { width: MildTheme.spacing[24] },
  wFull: { width: '100%' },
  
  // Height
  h8: { height: MildTheme.spacing[8] },
  h12: { height: MildTheme.spacing[12] },
  h16: { height: MildTheme.spacing[16] },
  h20: { height: MildTheme.spacing[20] },
  h24: { height: MildTheme.spacing[24] },
  hFull: { height: '100%' },
  
  // Square sizes
  size8: { width: MildTheme.spacing[8], height: MildTheme.spacing[8] },
  size12: { width: MildTheme.spacing[12], height: MildTheme.spacing[12] },
  size16: { width: MildTheme.spacing[16], height: MildTheme.spacing[16] },
});

// Export all utilities
export const MildUtils = {
  layout,
  spacing,
  typography,
  colorsLight,
  colorsDark,
  borders,
  shadows,
  position,
  sizing,
};

export default MildUtils;
`;
}

function generateReactNativeTypes(tokens) {
  return `// Generated by mild-ui/core
// DO NOT EDIT - This file is auto-generated

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface SemanticColors {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  primary: string;
}

export interface Colors {
  primary: ColorPalette;
  gray: ColorPalette;
}

export interface SemanticColorSchemes {
  light: SemanticColors;
  dark: SemanticColors;
}

export interface Spacing {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  8: number;
  10: number;
  12: number;
  16: number;
  20: number;
  24: number;
}

export interface Typography {
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
}

export interface BorderRadius {
  none: number;
  sm: number;
  base: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  sm: Shadow;
  base: Shadow;
  md: Shadow;
  lg: Shadow;
  xl: Shadow;
}

export interface MildTheme {
  colors: Colors;
  semanticColors: SemanticColorSchemes;
  spacing: Spacing;
  typography: Typography;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

export declare const colors: Colors;
export declare const semanticColors: SemanticColorSchemes;
export declare const spacing: Spacing;
export declare const typography: Typography;
export declare const borderRadius: BorderRadius;
export declare const shadows: Shadows;
export declare const MildTheme: MildTheme;

export default MildTheme;
`;
}

function generateReactNativeThemeTS(tokens) {
  return `// Generated by mild-ui/core
// DO NOT EDIT - This file is auto-generated
import type { ColorPalette, SemanticColors, MildTheme as MildThemeType } from './MildTheme.d';

/**
 * Mild UI Theme for React Native (TypeScript)
 * 
 * A comprehensive design system with colors, typography, and spacing
 * matching the mild-ui web design system.
 */

// Color Palettes
export const colors = {
  primary: {
    50: '${tokens.colors.primary["50"]}',
    100: '${tokens.colors.primary["100"]}',
    200: '${tokens.colors.primary["200"]}',
    300: '${tokens.colors.primary["300"]}',
    400: '${tokens.colors.primary["400"]}',
    500: '${tokens.colors.primary["500"]}',
    600: '${tokens.colors.primary["600"]}',
    700: '${tokens.colors.primary["700"]}',
    800: '${tokens.colors.primary["800"]}',
    900: '${tokens.colors.primary["900"]}',
  } as ColorPalette,
  gray: {
    50: '${tokens.colors.gray["50"]}',
    100: '${tokens.colors.gray["100"]}',
    200: '${tokens.colors.gray["200"]}',
    300: '${tokens.colors.gray["300"]}',
    400: '${tokens.colors.gray["400"]}',
    500: '${tokens.colors.gray["500"]}',
    600: '${tokens.colors.gray["600"]}',
    700: '${tokens.colors.gray["700"]}',
    800: '${tokens.colors.gray["800"]}',
    900: '${tokens.colors.gray["900"]}',
  } as ColorPalette,
};

// Semantic colors
export const semanticColors = {
  light: {
    background: colors.gray[50],
    foreground: colors.gray[900],
    muted: colors.gray[100],
    mutedForeground: colors.gray[500],
    border: colors.gray[200],
    primary: colors.primary[500],
  } as SemanticColors,
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    muted: '#262626',
    mutedForeground: '#a3a3a3',
    border: '#262626',
    primary: colors.primary[400],
  } as SemanticColors,
};

// Spacing scale (converted from rem to React Native points)
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// Typography scale
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
  },
} as const;

// Border radius scale
export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 999,
} as const;

// Shadow presets
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
  },
} as const;

// Complete theme object
export const MildTheme: MildThemeType = {
  colors,
  semanticColors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export default MildTheme;
`;
}

function generateReactNativeUtilsTS(tokens) {
  return `// Generated by mild-ui/core
// DO NOT EDIT - This file is auto-generated
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { MildTheme } from './MildTheme';

/**
 * Mild UI Utility StyleSheets for React Native (TypeScript)
 * 
 * Provides Tailwind-like utility styles for React Native
 * matching the mild-ui web utility classes.
 */

// Layout utilities
export const layout = StyleSheet.create({
  flex: {
    display: 'flex',
  } as ViewStyle,
  flexRow: {
    flexDirection: 'row',
  } as ViewStyle,
  flexCol: {
    flexDirection: 'column',
  } as ViewStyle,
  justifyStart: {
    justifyContent: 'flex-start',
  } as ViewStyle,
  justifyCenter: {
    justifyContent: 'center',
  } as ViewStyle,
  justifyEnd: {
    justifyContent: 'flex-end',
  } as ViewStyle,
  justifyBetween: {
    justifyContent: 'space-between',
  } as ViewStyle,
  justifyAround: {
    justifyContent: 'space-around',
  } as ViewStyle,
  itemsStart: {
    alignItems: 'flex-start',
  } as ViewStyle,
  itemsCenter: {
    alignItems: 'center',
  } as ViewStyle,
  itemsEnd: {
    alignItems: 'flex-end',
  } as ViewStyle,
  itemsStretch: {
    alignItems: 'stretch',
  } as ViewStyle,
  flex1: {
    flex: 1,
  } as ViewStyle,
  flexGrow: {
    flexGrow: 1,
  } as ViewStyle,
  flexShrink: {
    flexShrink: 1,
  } as ViewStyle,
});

// Spacing utilities
export const spacing = StyleSheet.create({
  p0: { padding: MildTheme.spacing[0] } as ViewStyle,
  p1: { padding: MildTheme.spacing[1] } as ViewStyle,
  p2: { padding: MildTheme.spacing[2] } as ViewStyle,
  p3: { padding: MildTheme.spacing[3] } as ViewStyle,
  p4: { padding: MildTheme.spacing[4] } as ViewStyle,
  p5: { padding: MildTheme.spacing[5] } as ViewStyle,
  p6: { padding: MildTheme.spacing[6] } as ViewStyle,
  p8: { padding: MildTheme.spacing[8] } as ViewStyle,
  px1: { paddingHorizontal: MildTheme.spacing[1] } as ViewStyle,
  px2: { paddingHorizontal: MildTheme.spacing[2] } as ViewStyle,
  px3: { paddingHorizontal: MildTheme.spacing[3] } as ViewStyle,
  px4: { paddingHorizontal: MildTheme.spacing[4] } as ViewStyle,
  px6: { paddingHorizontal: MildTheme.spacing[6] } as ViewStyle,
  py1: { paddingVertical: MildTheme.spacing[1] } as ViewStyle,
  py2: { paddingVertical: MildTheme.spacing[2] } as ViewStyle,
  py3: { paddingVertical: MildTheme.spacing[3] } as ViewStyle,
  py4: { paddingVertical: MildTheme.spacing[4] } as ViewStyle,
  py6: { paddingVertical: MildTheme.spacing[6] } as ViewStyle,
  m0: { margin: MildTheme.spacing[0] } as ViewStyle,
  m1: { margin: MildTheme.spacing[1] } as ViewStyle,
  m2: { margin: MildTheme.spacing[2] } as ViewStyle,
  m3: { margin: MildTheme.spacing[3] } as ViewStyle,
  m4: { margin: MildTheme.spacing[4] } as ViewStyle,
  m6: { margin: MildTheme.spacing[6] } as ViewStyle,
  mx1: { marginHorizontal: MildTheme.spacing[1] } as ViewStyle,
  mx2: { marginHorizontal: MildTheme.spacing[2] } as ViewStyle,
  mx4: { marginHorizontal: MildTheme.spacing[4] } as ViewStyle,
  my1: { marginVertical: MildTheme.spacing[1] } as ViewStyle,
  my2: { marginVertical: MildTheme.spacing[2] } as ViewStyle,
  my4: { marginVertical: MildTheme.spacing[4] } as ViewStyle,
});

// Typography utilities
export const typography = StyleSheet.create({
  textXs: {
    fontSize: MildTheme.typography.fontSize.xs,
    lineHeight: MildTheme.typography.lineHeight.xs,
  } as TextStyle,
  textSm: {
    fontSize: MildTheme.typography.fontSize.sm,
    lineHeight: MildTheme.typography.lineHeight.sm,
  } as TextStyle,
  textBase: {
    fontSize: MildTheme.typography.fontSize.base,
    lineHeight: MildTheme.typography.lineHeight.base,
  } as TextStyle,
  textLg: {
    fontSize: MildTheme.typography.fontSize.lg,
    lineHeight: MildTheme.typography.lineHeight.lg,
  } as TextStyle,
  textXl: {
    fontSize: MildTheme.typography.fontSize.xl,
    lineHeight: MildTheme.typography.lineHeight.xl,
  } as TextStyle,
  text2xl: {
    fontSize: MildTheme.typography.fontSize['2xl'],
    lineHeight: MildTheme.typography.lineHeight['2xl'],
  } as TextStyle,
  fontNormal: {
    fontWeight: MildTheme.typography.fontWeight.normal,
  } as TextStyle,
  fontMedium: {
    fontWeight: MildTheme.typography.fontWeight.medium,
  } as TextStyle,
  fontSemibold: {
    fontWeight: MildTheme.typography.fontWeight.semibold,
  } as TextStyle,
  fontBold: {
    fontWeight: MildTheme.typography.fontWeight.bold,
  } as TextStyle,
  textLeft: {
    textAlign: 'left',
  } as TextStyle,
  textCenter: {
    textAlign: 'center',
  } as TextStyle,
  textRight: {
    textAlign: 'right',
  } as TextStyle,
});

// Export all utilities with proper typing
export const MildUtils = {
  layout,
  spacing,
  typography,
} as const;

export default MildUtils;
`;
}

function generateReactNativeReadme() {
  return `# mild-ui React Native Theme

Convert your mild-ui design system to React Native with identical design tokens, colors, typography, and spacing.

## Installation

1. Copy the generated files to your React Native project:
   \`\`\`
   src/theme/
     MildTheme.js (or .ts)
     MildUtils.js (or .ts)
   \`\`\`

2. Import the theme in your app:
   \`\`\`javascript
   import { MildTheme, MildUtils } from './theme/MildTheme';
   \`\`\`

## Usage

Access design tokens and utility StyleSheets directly in your React Native components:

\`\`\`javascript
import { MildTheme, MildUtils } from './theme/MildTheme';

// Use design tokens
const styles = StyleSheet.create({
  container: {
    padding: MildTheme.spacing[4],
    backgroundColor: MildTheme.colors.primary[500],
  }
});

// Use utility StyleSheets
<View style={[MildUtils.layout.flex, MildUtils.spacing.p4]} />
\`\`\`

## Design Token Mapping

| Web CSS | React Native StyleSheet |
|---------|-------------------------|
| \`mild-p-4\` | \`MildUtils.spacing.p4\` |
| \`mild-text-xl\` | \`MildUtils.typography.textXl\` |
| \`mild-bg-primary-500\` | \`{ backgroundColor: MildTheme.colors.primary[500] }\` |

## TypeScript Support

All files include full TypeScript definitions for type safety.

This React Native theme maintains 100% design consistency with your mild-ui web application.
`;
}

module.exports = { generateReactNativeStyles };

if (require.main === module) {
  generateReactNativeStyles();
}