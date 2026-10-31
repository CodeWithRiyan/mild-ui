"use client";

// templates/next-app-router/app/providers.tsx
// The only Client Component the layout needs: the providers keep state (color mode, toasts).
import { ThemeProvider, ToastProvider } from "@mild-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultColorMode="system">
      <ToastProvider placement="bottom-right">{children}</ToastProvider>
    </ThemeProvider>
  );
}
