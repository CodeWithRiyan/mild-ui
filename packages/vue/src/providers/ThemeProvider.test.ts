import { defineComponent, h, nextTick, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useColorMode, useTheme, type ThemeContextValue } from "./index";
import type { ColorMode } from "../types";
import { ColorModeScript, getColorModeScript } from "./ColorModeScript";
import { asComponent } from "../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../test-utils/axe";
import { Button } from "../components/Button";

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
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return query.includes("dark") && systemDark;
    },
    media: query,
    addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) =>
      listeners.add(listener),
    removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) =>
      listeners.delete(listener),
  }));
});

afterEach(() => {
  const root = document.documentElement;
  root.removeAttribute("data-theme");
  root.removeAttribute("data-color-mode");
  root.removeAttribute("style");
});

/** Renders the context and offers buttons to change it. */
const Probe = defineComponent({
  setup() {
    const theme = useTheme();
    const colorMode = useColorMode();
    return () =>
      h("div", [
        h("span", { "data-testid": "mode" }, theme.colorMode.value),
        h("span", { "data-testid": "resolved" }, theme.resolvedColorMode.value),
        h("span", { "data-testid": "system" }, theme.systemColorMode.value),
        h(
          "span",
          { "data-testid": "flags" },
          `${theme.isDark.value}|${theme.isLight.value}|${theme.isSystem.value}`,
        ),
        h(
          "span",
          { "data-testid": "same" },
          String(colorMode.setColorMode === theme.setColorMode && !("theme" in colorMode)),
        ),
        h(
          "span",
          { "data-testid": "primary" },
          String((theme.theme.value.colors?.primary as Record<string, string>)[500]),
        ),
        h("button", { onClick: theme.toggleColorMode }, "toggle"),
        h("button", { onClick: () => theme.setColorMode("system") }, "system"),
        h("button", { onClick: () => theme.setColorMode("dark") }, "dark"),
      ]);
  },
});

const html = () => document.documentElement;

function renderProvider(props: Record<string, unknown> = {}) {
  return render(asComponent(() => h(ThemeProvider, props, () => h(Probe))));
}

describe("ThemeProvider", () => {
  it("defaults to system mode and resolves it against the OS preference", async () => {
    systemDark = true;
    renderProvider();
    await nextTick();
    expect(screen.getByTestId("mode")).toHaveTextContent("system");
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(screen.getByTestId("flags")).toHaveTextContent("true|false|true");
    expect(html()).toHaveAttribute("data-theme", "dark");
    expect(html()).toHaveAttribute("data-color-mode", "system");
    expect(html().style.colorScheme).toBe("dark");
  });

  it("follows OS changes live while in system mode, and stops listening on unmount", async () => {
    const { unmount } = renderProvider();
    await nextTick();
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");

    setSystemDark(true);
    await nextTick();
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(screen.getByTestId("system")).toHaveTextContent("dark");
    expect(html()).toHaveAttribute("data-theme", "dark");

    setSystemDark(false);
    await nextTick();
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
    expect(html()).toHaveAttribute("data-theme", "light");

    expect(listeners.size).toBe(1);
    unmount();
    expect(listeners.size).toBe(0);
  });

  it("ignores OS changes once an explicit mode is chosen, but keeps reporting them", async () => {
    renderProvider();
    await fireEvent.click(screen.getByText("dark"));
    setSystemDark(false);
    await nextTick();
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(screen.getByTestId("system")).toHaveTextContent("light");

    await fireEvent.click(screen.getByText("system"));
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
  });

  it("toggles between light and dark and persists the choice", async () => {
    renderProvider();
    await fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    expect(screen.getByTestId("flags")).toHaveTextContent("true|false|false");
    expect(window.localStorage.getItem("mild-ui-color-mode")).toBe("dark");

    await fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    expect(window.localStorage.getItem("mild-ui-color-mode")).toBe("light");
  });

  it("restores the stored mode over the default, and ignores garbage", async () => {
    window.localStorage.setItem("mild-ui-color-mode", "dark");
    const { unmount } = renderProvider({ defaultColorMode: "light" });
    await nextTick();
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    unmount();

    window.localStorage.setItem("mild-ui-color-mode", "blue");
    renderProvider({ defaultColorMode: "light" });
    await nextTick();
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
  });

  it("still honours the deprecated defaultTheme prop", async () => {
    renderProvider({ defaultTheme: "dark" });
    await nextTick();
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
  });

  it("can run without persistence, under a custom key, and with storage blocked", async () => {
    const { unmount } = renderProvider({ storageKey: null });
    await fireEvent.click(screen.getByText("dark"));
    expect(window.localStorage.length).toBe(0);
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    unmount();

    const { unmount: unmountCustom } = renderProvider({ storageKey: "app:mode" });
    await fireEvent.click(screen.getByText("dark"));
    expect(window.localStorage.getItem("app:mode")).toBe("dark");
    unmountCustom();

    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    renderProvider({ defaultColorMode: "light" });
    await nextTick();
    expect(screen.getByTestId("mode")).toHaveTextContent("light");
    await fireEvent.click(screen.getByText("dark"));
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
    getItem.mockRestore();
    setItem.mockRestore();
  });

  it("supports a controlled color mode (v-model:colorMode)", async () => {
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const mode = ref<ColorMode>("light");
    render(
      asComponent(() =>
        h(
          ThemeProvider,
          { colorMode: mode.value, "onUpdate:colorMode": onUpdate, onColorModeChange: onChange },
          () => h(Probe),
        ),
      ),
    );
    await fireEvent.click(screen.getByText("toggle"));
    expect(onUpdate).toHaveBeenCalledWith("dark");
    expect(onChange).toHaveBeenCalledWith("dark");
    // Still light until the parent says otherwise.
    expect(screen.getByTestId("mode")).toHaveTextContent("light");

    mode.value = "dark";
    await nextTick();
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    expect(html()).toHaveAttribute("data-theme", "dark");
  });

  it("exposes one API: useColorMode is the color-mode slice of useTheme", async () => {
    renderProvider();
    expect(screen.getByTestId("same")).toHaveTextContent("true");
    expect(screen.getByTestId("primary")).toHaveTextContent("#0ea5e9");
  });

  it("renders no element of its own unless given `as`", () => {
    const { container } = render(asComponent(() => h(ThemeProvider, {}, () => h("i", "content"))));
    expect(container.innerHTML).toBe("<i>content</i>");

    const { container: wrapped } = render(
      asComponent(() => h(ThemeProvider, { as: "main", class: "app" }, () => h("i", "content"))),
    );
    const root = wrapped.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("MAIN");
    expect(root).toHaveClass("mild-theme-provider", "app");
    expect(root.innerHTML).toBe("<i>content</i>");
  });

  it("hands the context to its default slot", async () => {
    render(
      asComponent(() =>
        h(
          ThemeProvider,
          { defaultColorMode: "dark" },
          {
            default: (context: ThemeContextValue) => h("output", context.colorMode.value),
          },
        ),
      ),
    );
    expect(screen.getByRole("status")).toHaveTextContent("dark");
  });

  it("writes theme overrides as the core custom properties and removes them on change and unmount", async () => {
    const theme = ref<Record<string, unknown> | undefined>({
      colors: { primary: { 500: "#ff0000" } },
      radii: { lg: "1rem" },
    });
    const { unmount } = render(
      asComponent(() => h(ThemeProvider, { theme: theme.value }, () => h(Probe))),
    );
    await nextTick();
    expect(html().style.getPropertyValue("--mild-color-primary-500")).toBe("#ff0000");
    expect(html().style.getPropertyValue("--mild-radius-lg")).toBe("1rem");
    // Merged for JavaScript readers, defaults untouched on the DOM.
    expect(screen.getByTestId("primary")).toHaveTextContent("#ff0000");
    expect(html().style.getPropertyValue("--mild-color-primary-600")).toBe("");

    theme.value = { colors: { primary: { 500: "#00ff00" } } };
    await nextTick();
    expect(html().style.getPropertyValue("--mild-color-primary-500")).toBe("#00ff00");
    expect(html().style.getPropertyValue("--mild-radius-lg")).toBe("");

    theme.value = undefined;
    await nextTick();
    expect(html().style.getPropertyValue("--mild-color-primary-500")).toBe("");
    expect(screen.getByTestId("primary")).toHaveTextContent("#0ea5e9");

    theme.value = { colors: { primary: { 500: "#0000ff" } } };
    await nextTick();
    unmount();
    expect(html().style.getPropertyValue("--mild-color-primary-500")).toBe("");
  });

  it("uses a custom css variable prefix", async () => {
    render(
      asComponent(() =>
        h(ThemeProvider, { theme: { space: { "4": "2rem" } }, cssVarPrefix: "app" }, () =>
          h(Probe),
        ),
      ),
    );
    await nextTick();
    expect(html().style.getPropertyValue("--app-space-4")).toBe("2rem");
  });

  it("throws a helpful error when used outside the provider", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(Probe)).toThrow("useTheme must be used within a <ThemeProvider>");
    const OnlyColorMode = defineComponent({
      setup() {
        useColorMode();
        return () => null;
      },
    });
    expect(() => render(OnlyColorMode)).toThrow(
      "useColorMode must be used within a <ThemeProvider>",
    );
    warn.mockRestore();
  });

  it("does nothing on the server-like path where matchMedia is missing", async () => {
    (window as { matchMedia?: unknown }).matchMedia = undefined;
    renderProvider();
    await nextTick();
    expect(screen.getByTestId("resolved")).toHaveTextContent("light");
  });
});

describe("ColorModeScript", () => {
  function runScript(source: string) {
    // Execute the inline script the way a browser would, against the jsdom document.
    new Function(source)();
  }

  it("applies the stored mode to <html> before the app renders", () => {
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
    const { container } = render(ColorModeScript, {
      props: { nonce: "abc", storageKey: "app:mode" },
    });
    const script = container.querySelector("script")!;
    expect(script).toHaveAttribute("nonce", "abc");
    expect(script).toHaveAttribute("data-mild-color-mode-script", "");
    expect(script.innerHTML).toBe(getColorModeScript({ storageKey: "app:mode" }));
  });

  it("agrees with the provider on what it applies", async () => {
    window.localStorage.setItem("mild-ui-color-mode", "dark");
    runScript(getColorModeScript());
    const before = html().getAttribute("data-theme");
    renderProvider();
    await nextTick();
    expect(html().getAttribute("data-theme")).toBe(before);
    expect(screen.getByTestId("mode")).toHaveTextContent("dark");
  });
});

itHasNoSeriousAxeViolations("ThemeProvider", () =>
  h(ThemeProvider, { defaultColorMode: "dark" }, () => h(Button, () => "Themed")),
);
