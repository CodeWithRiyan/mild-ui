// apps/playground-react/src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mild-ui/react";
import { App } from "./App";
import "./styles.scss";

const container = document.getElementById("root");
if (!container) throw new Error("#root is missing from index.html");

createRoot(container).render(
  <React.StrictMode>
    <ThemeProvider defaultColorMode="system">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
