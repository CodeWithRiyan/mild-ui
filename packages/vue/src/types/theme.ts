// Theme configuration types
export interface ThemeConfig {
  colors: {
    primary: {
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
    };
    gray: {
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
    };
    background: string;
    foreground: string;
    muted: string;
    "muted-foreground": string;
    popover: string;
    "popover-foreground": string;
    accent: string;
    "accent-foreground": string;
    border: string;
    input: string;
    ring: string;
  };
  borderRadius: {
    lg: string;
    md: string;
    sm: string;
  };
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    background: "#ffffff",
    foreground: "#09090b",
    muted: "#f1f5f9",
    "muted-foreground": "#64748b",
    popover: "#ffffff",
    "popover-foreground": "#09090b",
    accent: "#f1f5f9",
    "accent-foreground": "#0f172a",
    border: "#e2e8f0",
    input: "#e2e8f0",
    ring: "#3b82f6",
  },
  borderRadius: {
    lg: "0.5rem",
    md: "0.375rem",
    sm: "0.25rem",
  },
};

export const darkTheme: ThemeConfig = {
  colors: {
    primary: {
      50: "#1e3a8a",
      100: "#1e40af",
      200: "#1d4ed8",
      300: "#2563eb",
      400: "#3b82f6",
      500: "#60a5fa",
      600: "#93c5fd",
      700: "#bfdbfe",
      800: "#dbeafe",
      900: "#eff6ff",
    },
    gray: {
      50: "#111827",
      100: "#1f2937",
      200: "#374151",
      300: "#4b5563",
      400: "#6b7280",
      500: "#9ca3af",
      600: "#d1d5db",
      700: "#e5e7eb",
      800: "#f3f4f6",
      900: "#f9fafb",
    },
    background: "#09090b",
    foreground: "#fafafa",
    muted: "#262626",
    "muted-foreground": "#a1a1aa",
    popover: "#09090b",
    "popover-foreground": "#fafafa",
    accent: "#262626",
    "accent-foreground": "#fafafa",
    border: "#27272a",
    input: "#27272a",
    ring: "#3b82f6",
  },
  borderRadius: {
    lg: "0.5rem",
    md: "0.375rem",
    sm: "0.25rem",
  },
};

export function applyTheme(theme: ThemeConfig): void {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  const colors = theme.colors;

  // Apply color variables
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === "object") {
      Object.entries(value).forEach(([shade, color]) => {
        root.style.setProperty(`--${key}-${shade}`, color);
      });
    } else {
      root.style.setProperty(`--${key}`, value);
    }
  });

  // Apply border radius variables
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value);
  });
}