import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useColorMode, useTheme } from "./ThemeProvider";
import { ColorModeScript, getColorModeScript } from "./ColorModeScript";

// A controllable `matchMedia` (jsdom has none): `setSystemDark()` fires the change listeners.
let systemDark = false;
const listeners = new Set<(event: { matches: boolean }) => void>();
function setSystemDark(dark: boolean) {
  systemDark = dark;
  for (const listener of listeners) listener({ matches: dark });
}
beforeEach(() => {
  systemDark = false;
  listeners.clear();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-color-mode");
  document.documentElement.style.colorScheme = "";
  window.matchMedia = vi.fn((query: string) => ({
    get matches() {
      return query.includes("dark") && systemDark;
    },
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
      listeners.delete(listener);
    },
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});
afterEach(() => {
  vi.restoreAllMocks();
});

function Probe() {
  const theme = useTheme();
  const colorMode = useColorMode();
  return (
    <div>
      <output data-testid="mode">{theme.colorMode}</output>
      <output data-testid="resolved">{theme.resolvedColorMode}</output>
      <output data-testid="system">{theme.systemColorMode}</output>
      <output data-testid="same">
        {String(colorMode.resolvedColorMode === theme.resolvedColorMode)}
      </output>
      <output data-testid="primary">{String(theme.theme.colors?.primary?.[500])}</output>
      <button onClick={theme.toggleColorMode}>toggle</button>
      <button onClick={() => theme.setColorMode("system")}>system</button>
      <button onClick={() => theme.setColorMode("dark")}>dark</button>
    </div>
  );
}

const html = () => document.documentElement;

describe("ThemeProvider", () => {
  it("defaults to system mode and resolves it against the OS preference", () => {
    systemDark = true;
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("system");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(html()).toHaveAttribute("data-theme", "dark");
    expect(html()).toHaveAttribute("data-color-mode", "system");
    expect(html().style.colorScheme).toBe("dark");
  });

  it("follows OS changes live while in system mode", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");

    act(() => setSystemDark(true));
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(screen.getByTestId("system")).toHaveTextContent("dark");
    expect(html()).toHaveAttribute("data-theme", "dark");

    act(() => setSystemDark(false));
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    expect(html()).toHaveAttribute("data-theme", "light");
  });

  it("ignores OS changes once an explicit mode is chosen, but keeps reporting them", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("dark"));
    act(() => setSystemDark(false));
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(screen.getByTestId("system")).toHaveTextContent("light");

    fireEvent.click(screen.getByText("system"));
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
  });

  it("toggles between light and dark and persists the choice", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    expect(window.localStorage.getItem("mild-ui-color-mode")).toBe("dark");

    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    expect(window.localStorage.getItem("mild-ui-color-mode")).toBe("light");
  });

  it("restores the stored mode over the default, and ignores garbage", () => {
    window.localStorage.setItem("mild-ui-color-mode", "dark");
    const { unmount } = render(
      <ThemeProvider defaultColorMode="light">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    unmount();

    window.localStorage.setItem("mild-ui-color-mode", "blue");
    render(
      <ThemeProvider defaultColorMode="light">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
  });

  it("can run without persistence and under a custom key", () => {
    const { unmount } = render(
      <ThemeProvider storageKey={null}>
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("dark"));
    expect(window.localStorage.length).toBe(0);
    unmount();

    render(
      <ThemeProvider storageKey="app:mode">
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("dark"));
    expect(window.localStorage.getItem("app:mode")).toBe("dark");
  });

  it("supports a controlled color mode", () => {
    const onColorModeChange = vi.fn();
    const { rerender } = render(
      <ThemeProvider colorMode="light" onColorModeChange={onColorModeChange}>
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText("toggle"));
    expect(onColorModeChange).toHaveBeenCalledWith("dark");
    // Still light until the parent says otherwise.
    expect(screen.getByTestId("mode")).toHaveTextContent("light");

    rerender(
      <ThemeProvider colorMode="dark" onColorModeChange={onColorModeChange}>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
  });

  it("exposes one API: useColorMode is the color-mode slice of useTheme", () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("same")).toHaveTextContent("true");
    expect(screen.getByTestId("primary")).toHaveTextContent("#0ea5e9");
  });

  it("writes theme overrides as the core custom properties and removes them on unmount", () => {
    const { unmount } = render(
      <ThemeProvider theme={{ colors: { primary: { 500: "#ff0000" } }, radii: { lg: "1rem" } }}>
        <Probe />
      </ThemeProvider>,
    );
    expect(html().style.getPropertyValue("--mild-color-primary-500")).toBe("#ff0000");
    expect(html().style.getPropertyValue("--mild-radius-lg")).toBe("1rem");
    // Merged for JavaScript readers, defaults untouched on the DOM.
    expect(screen.getByTestId("primary")).toHaveTextContent("#ff0000");
    expect(html().style.getPropertyValue("--mild-color-primary-600")).toBe("");

    unmount();
    expect(html().style.getPropertyValue("--mild-color-primary-500")).toBe("");
  });

  it("throws a helpful error when used outside the provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow("useTheme must be used within a <ThemeProvider>");
    consoleError.mockRestore();
  });
});

describe("ColorModeScript", () => {
  function runScript(source: string) {
    // Execute the inline script the way a browser would, against the jsdom document.
    new Function(source)();
  }

  it("applies the stored mode to <html> before React renders", () => {
    window.localStorage.setItem("mild-ui-color-mode", "dark");
    runScript(getColorModeScript());
    expect(html()).toHaveAttribute("data-theme", "dark");
    expect(html()).toHaveAttribute("data-color-mode", "dark");
    expect(html().style.colorScheme).toBe("dark");
  });

  it("resolves system mode against the OS and falls back to the default", () => {
    systemDark = true;
    runScript(getColorModeScript());
    expect(html()).toHaveAttribute("data-theme", "dark");
    expect(html()).toHaveAttribute("data-color-mode", "system");

    window.localStorage.setItem("mild-ui-color-mode", "nonsense");
    runScript(getColorModeScript({ defaultColorMode: "light" }));
    expect(html()).toHaveAttribute("data-theme", "light");
    expect(html()).toHaveAttribute("data-color-mode", "light");
  });

  it("honours a custom storage key and never throws when storage is blocked", () => {
    window.localStorage.setItem("app:mode", "dark");
    runScript(getColorModeScript({ storageKey: "app:mode" }));
    expect(html()).toHaveAttribute("data-theme", "dark");

    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => runScript(getColorModeScript())).not.toThrow();
    getItem.mockRestore();
  });

  it("renders as an inline <script> with an optional nonce", () => {
    const { container } = render(<ColorModeScript nonce="abc" storageKey="app:mode" />);
    const script = container.querySelector("script")!;
    expect(script).toHaveAttribute("nonce", "abc");
    expect(script.innerHTML).toBe(getColorModeScript({ storageKey: "app:mode" }));
  });

  it("agrees with the provider on what it applies", () => {
    window.localStorage.setItem("mild-ui-color-mode", "dark");
    runScript(getColorModeScript());
    const before = html().getAttribute("data-theme");
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(html().getAttribute("data-theme")).toBe(before);
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
  });
});
