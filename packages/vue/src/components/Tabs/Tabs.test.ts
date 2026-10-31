import { defineComponent, h, ref } from "vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import { tabsCases } from "@mild-ui/test-cases/tabs";
import { runComponentCases, caseProps } from "../../test-utils/run-cases";
import { asComponent } from "../../test-utils/render";
import { itHasNoSeriousAxeViolations } from "../../test-utils/axe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

runComponentCases(tabsCases, (c) =>
  h(Tabs, caseProps(c), () => [
    h(TabsList, () => [
      h(TabsTrigger, { value: "one" }, () => "One"),
      h(TabsTrigger, { value: "two" }, () => "Two"),
    ]),
    h(TabsContent, { value: "one" }, () => "Panel one"),
    h(TabsContent, { value: "two" }, () => "Panel two"),
  ]),
);

function renderTabs(props: Record<string, unknown> = {}) {
  return render(
    asComponent(() =>
      h(Tabs, { defaultValue: "one", ...props }, () => [
        h(TabsList, { "aria-label": "Sections" }, () => [
          h(TabsTrigger, { value: "one" }, () => "One"),
          h(TabsTrigger, { value: "two" }, () => "Two"),
          h(TabsTrigger, { value: "three", disabled: true }, () => "Three"),
        ]),
        h(TabsContent, { value: "one" }, () => "Panel one"),
        h(TabsContent, { value: "two" }, () => "Panel two"),
        h(TabsContent, { value: "three" }, () => "Panel three"),
      ]),
    ),
  );
}

const keyDown = (key: string) => fireEvent.keyDown(document.activeElement as Element, { key });

describe("Tabs (WAI-ARIA tabs pattern)", () => {
  it("wires tablist, tabs and panels with the pattern's roles and relationships", () => {
    renderTabs();
    const list = screen.getByRole("tablist", { name: "Sections" });
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    expect(list).toHaveClass("mild-tabs-list", "mild-tabs-list--default");
    expect(list.closest(".mild-tabs")).toHaveAttribute("data-orientation", "horizontal");

    const one = screen.getByRole("tab", { name: "One" });
    const panel = screen.getByRole("tabpanel", { name: "One" });
    expect(one).toHaveAttribute("aria-selected", "true");
    expect(one).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", one.id);
    expect(panel).toHaveAttribute("tabindex", "0");
    expect(panel).toHaveTextContent("Panel one");
    expect(one).toHaveClass("mild-tabs-trigger", "mild-tabs-trigger--active");

    // Only the selected panel is rendered.
    expect(screen.queryByText("Panel two")).toBeNull();
    expect(screen.getByRole("tab", { name: "Three" })).toBeDisabled();
    expect(screen.getByRole("tab", { name: "Three" })).toHaveClass("mild-tabs-trigger--disabled");
  });

  it("is one tab stop: the selected tab has tabindex 0, the others -1", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("tabindex", "-1");
  });

  it("selects on click and reports the value", async () => {
    const onChange = vi.fn();
    renderTabs({ onChange });
    await fireEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(onChange).toHaveBeenCalledWith("two");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
    expect(screen.queryByText("Panel one")).toBeNull();
  });

  it("automatic activation: Arrow keys move focus and select, skipping disabled tabs", async () => {
    const onChange = vi.fn();
    renderTabs({ onChange });
    const one = screen.getByRole("tab", { name: "One" });
    const two = screen.getByRole("tab", { name: "Two" });

    one.focus();
    await keyDown("ArrowRight");
    expect(two).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith("two");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");

    // Three is disabled, so the next tab wraps to One.
    await keyDown("ArrowRight");
    expect(one).toHaveFocus();
    await keyDown("End");
    expect(two).toHaveFocus();
    await keyDown("Home");
    expect(one).toHaveFocus();
  });

  it("manual activation: Arrow keys only move focus; Enter / Space select", async () => {
    const onChange = vi.fn();
    renderTabs({ activation: "manual", onChange });
    const one = screen.getByRole("tab", { name: "One" });
    const two = screen.getByRole("tab", { name: "Two" });

    one.focus();
    await keyDown("ArrowRight");
    expect(two).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();
    expect(one).toHaveAttribute("aria-selected", "true");

    await keyDown("Enter");
    expect(onChange).toHaveBeenCalledWith("two");
    expect(two).toHaveAttribute("aria-selected", "true");
  });

  it("vertical orientation uses Up/Down", async () => {
    renderTabs({ orientation: "vertical" });
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
    expect(screen.getByRole("tablist").closest(".mild-tabs")).toHaveClass("mild-tabs--vertical");
    const one = screen.getByRole("tab", { name: "One" });
    one.focus();
    await keyDown("ArrowDown");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    await keyDown("ArrowRight");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
  });

  it("follows a controlled value (v-model) and snaps back when the parent ignores a change", async () => {
    const onChange = vi.fn();
    const value = ref("one");
    render(
      asComponent(() =>
        h(Tabs, { modelValue: value.value, onChange }, () => [
          h(TabsList, () => [
            h(TabsTrigger, { value: "one" }, () => "One"),
            h(TabsTrigger, { value: "two" }, () => "Two"),
          ]),
          h(TabsContent, { value: "one" }, () => "Panel one"),
          h(TabsContent, { value: "two" }, () => "Panel two"),
        ]),
      ),
    );
    await fireEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(onChange).toHaveBeenCalledWith("two");
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");

    value.value = "two";
    await fireEvent.click(document.body);
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");

    const Harness = defineComponent({
      setup() {
        const tab = ref("a");
        return () => [
          h(
            Tabs,
            { modelValue: tab.value, "onUpdate:modelValue": (v: string) => (tab.value = v) },
            () => [
              h(TabsList, { "aria-label": "Model" }, () => [
                h(TabsTrigger, { value: "a" }, () => "A"),
                h(TabsTrigger, { value: "b" }, () => "B"),
              ]),
              h(TabsContent, { value: "a" }, () => "Panel a"),
              h(TabsContent, { value: "b" }, () => "Panel b"),
            ],
          ),
          h("output", tab.value),
        ];
      },
    });
    render(Harness);
    await fireEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(screen.getByRole("status")).toHaveTextContent("b");
  });

  it("keeps hidden panels mounted with forceMount and maps variant/size classes", () => {
    render(
      asComponent(() =>
        h(Tabs, { defaultValue: "one", variant: "pills", size: "sm" }, () => [
          h(TabsList, () => [
            h(TabsTrigger, { value: "one" }, () => "One"),
            h(TabsTrigger, { value: "two" }, () => "Two"),
          ]),
          h(TabsContent, { value: "one" }, () => "Panel one"),
          h(TabsContent, { value: "two", forceMount: true }, () => "Panel two"),
        ]),
      ),
    );
    expect(screen.getByRole("tablist")).toHaveClass("mild-tabs-list--pills", "mild-tabs-list--sm");
    expect(screen.getByRole("tab", { name: "One" })).toHaveClass("mild-tabs-trigger--sm");
    const hidden = screen.getByText("Panel two");
    expect(hidden).not.toBeVisible();
    expect(hidden).toHaveAttribute("hidden");
    expect(screen.getByRole("tabpanel")).toHaveClass("mild-tabs-content--sm");
  });

  it("throws a helpful error when a part is used outside Tabs", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => render(h(TabsTrigger, { value: "x" }, () => "x"))).toThrow("inside <Tabs>");
    expect(() => render(h(TabsList))).toThrow("inside <Tabs>");
    expect(() => render(h(TabsContent, { value: "x" }))).toThrow("inside <Tabs>");
    warn.mockRestore();
  });
});

itHasNoSeriousAxeViolations("Tabs", () =>
  h(Tabs, { defaultValue: "one" }, () => [
    h(TabsList, { "aria-label": "Sections" }, () => [
      h(TabsTrigger, { value: "one" }, () => "One"),
      h(TabsTrigger, { value: "two" }, () => "Two"),
      h(TabsTrigger, { value: "three", disabled: true }, () => "Three"),
    ]),
    h(TabsContent, { value: "one" }, () => "Panel one"),
    h(TabsContent, { value: "two", forceMount: true }, () => "Panel two"),
  ]),
);
