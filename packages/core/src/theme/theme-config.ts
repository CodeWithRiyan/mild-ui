export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  radius: string;
  spacing: ThemeSpacing;
  fontFamily: {
    sans: string;
    mono: string;
  };
}

export const defaultTheme: ThemeConfig = {
  name: "default",
  colors: {
    background: "0 0% 100%",
    foreground: "222.2 47.4% 11.2%",
    card: "0 0% 100%",
    cardForeground: "222.2 47.4% 11.2%",
    popover: "0 0% 100%",
    popoverForeground: "222.2 47.4% 11.2%",
    primary: "222.2 47.4% 11.2%",
    primaryForeground: "210 40% 98%",
    secondary: "210 40% 96.1%",
    secondaryForeground: "222.2 47.4% 11.2%",
    muted: "210 40% 96.1%",
    mutedForeground: "215.4 16.3% 46.9%",
    accent: "210 40% 96.1%",
    accentForeground: "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "222.2 84% 4.9%",
  },
  radius: "0.5rem",
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  fontFamily: {
    sans: "ui-sans-serif, system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, monospace",
  },
};

export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  name: "dark",
  colors: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    cardForeground: "210 40% 98%",
    popover: "222.2 84% 4.9%",
    popoverForeground: "210 40% 98%",
    primary: "210 40% 98%",
    primaryForeground: "222.2 47.4% 11.2%",
    secondary: "217.2 32.6% 17.5%",
    secondaryForeground: "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    mutedForeground: "215 20.2% 65.1%",
    accent: "217.2 32.6% 17.5%",
    accentForeground: "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    destructiveForeground: "210 40% 98%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "212.7 26.8% 83.9%",
  },
};

// Theme utility functions
export function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement;

  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });

  // Apply other theme properties
  root.style.setProperty("--radius", theme.radius);

  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });
}

export function createCustomTheme(
  baseTheme: ThemeConfig,
  overrides: Partial<ThemeConfig>,
): ThemeConfig {
  return {
    ...baseTheme,
    ...overrides,
    colors: {
      ...baseTheme.colors,
      ...overrides.colors,
    },
    spacing: {
      ...baseTheme.spacing,
      ...overrides.spacing,
    },
    fontFamily: {
      ...baseTheme.fontFamily,
      ...overrides.fontFamily,
    },
  };
}
