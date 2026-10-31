// apps/playground-vue/src/App.ssr.test.ts
// The whole page, the way a framework serves it: rendered to HTML on the server, then hydrated
// from that HTML in the browser, with no hydration mismatch. Nuxt and Vite SSR depend on this.
import { createSSRApp, h, nextTick } from "vue";
import { renderToString } from "vue/server-renderer";
import { screen } from "@testing-library/vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@mild-ui/vue";
import App from "./App.vue";

let teardown: (() => void) | null = null;

afterEach(() => {
  teardown?.();
  teardown = null;
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const createPage = () =>
  createSSRApp({
    render: () => h(ThemeProvider, { defaultColorMode: "light", storageKey: null }, () => h(App)),
  });

describe("playground page: server rendering and hydration", () => {
  it("renders on the server and hydrates without a mismatch", async () => {
    const messages: string[] = [];
    vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
      messages.push(args.map(String).join(" "));
    });
    vi.spyOn(console, "warn").mockImplementation((...args: unknown[]) => {
      messages.push(args.map(String).join(" "));
    });

    // Server: no window at all.
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);
    let html = "";
    try {
      html = await renderToString(createPage());
    } finally {
      vi.unstubAllGlobals();
    }
    expect(html).toContain("mild-ui vue playground");
    expect(html).toContain('class="mild-card');
    expect(html).toContain('class="mild-table');
    expect(html).toContain('class="mild-map"');
    // Teleports (dialogs, toast regions) are not part of the server HTML.
    expect(html).not.toContain('role="dialog"');

    // Client: hydrate that exact HTML.
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.append(container);
    const app = createPage();
    app.mount(container);
    teardown = () => app.unmount();
    await nextTick();

    expect(messages.filter((message) => /hydration|mismatch/i.test(message))).toEqual([]);
    expect(messages).toEqual([]);
    expect(
      screen.getByRole("heading", { level: 1, name: "mild-ui vue playground" }),
    ).toBeInTheDocument();
    // Hydrated and interactive: the toolbar toggle still works.
    const italic = screen.getByRole("button", { name: "Italic" });
    italic.click();
    await nextTick();
    expect(italic).toHaveAttribute("aria-pressed", "true");
  });
});
