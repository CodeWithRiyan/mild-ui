// apps/playground-react/src/App.ssr.test.tsx
// The whole page, the way a framework serves it: rendered to HTML on the server, then hydrated
// from that HTML in the browser, with no hydration warning. Next.js (App Router), Remix and
// Astro all depend on this contract.
import * as React from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot, type Root } from "react-dom/client";
import { act, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@mild-ui/react";
import { App } from "./App";

let root: Root | null = null;

afterEach(() => {
  act(() => root?.unmount());
  root = null;
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("playground page: server rendering and hydration", () => {
  it("renders on the server and hydrates without a mismatch", () => {
    const errors: string[] = [];
    vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
      errors.push(args.map(String).join(" "));
    });
    vi.spyOn(console, "warn").mockImplementation((...args: unknown[]) => {
      errors.push(args.map(String).join(" "));
    });

    const tree = (
      <ThemeProvider defaultColorMode="light" storageKey={null}>
        <App />
      </ThemeProvider>
    );

    // Server: no window at all.
    vi.stubGlobal("window", undefined);
    let html = "";
    try {
      html = renderToString(tree);
    } finally {
      vi.unstubAllGlobals();
    }
    expect(html).toContain("mild-ui react playground");
    expect(html).toContain('class="mild-card');
    // Portals (dialogs, toast regions) are not part of the server HTML.
    expect(html).not.toContain('role="dialog"');

    // Client: hydrate that exact HTML.
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    act(() => {
      root = hydrateRoot(container, tree, {
        onRecoverableError: (error) => errors.push(`recoverable: ${String(error)}`),
      });
    });

    expect(errors).toEqual([]);
    expect(
      screen.getByRole("heading", { level: 1, name: "mild-ui react playground" }),
    ).toBeInTheDocument();
    // Hydrated and interactive: the toolbar toggle still works.
    const bold = screen.getByRole("button", { name: "Italic" });
    act(() => bold.click());
    expect(bold).toHaveAttribute("aria-pressed", "true");
  });
});
