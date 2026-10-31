// templates/next-app-router/app/layout.tsx
// Root layout (a Server Component). The stylesheet is imported once here; ColorModeScript runs
// before hydration so the stored color mode is painted without a flash; Providers is the one
// Client Component boundary the page needs (ThemeProvider + ToastProvider hold state).
import type { Metadata } from "next";
import { ColorModeScript } from "@mild-ui/react";
import "@mild-ui/react/styles.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "mild-ui · Next.js App Router playground",
  description: "Every @mild-ui/react component, server-rendered and hydrated without warnings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ColorModeScript sets data-theme on <html> before React hydrates; the attribute is
    // expected to differ from the server HTML, so React is told not to warn about it here.
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorModeScript defaultColorMode="system" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
