import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

function renderTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return render(
    <Tabs defaultValue="one" {...props}>
      <TabsList aria-label="Sections">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three" disabled>
          Three
        </TabsTrigger>
      </TabsList>
      <TabsContent value="one">Panel one</TabsContent>
      <TabsContent value="two">Panel two</TabsContent>
      <TabsContent value="three">Panel three</TabsContent>
    </Tabs>,
  );
}

const keyDown = (key: string) => fireEvent.keyDown(document.activeElement as Element, { key });

describe("Tabs (WAI-ARIA tabs pattern)", () => {
  it("wires tablist, tabs and panels with the pattern's roles and relationships", () => {
    renderTabs();
    const list = screen.getByRole("tablist", { name: "Sections" });
    expect(list).toHaveAttribute("aria-orientation", "horizontal");
    expect(list).toHaveClass("mild-tabs-list", "mild-tabs-list--default");

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
  });

  it("is one tab stop: the selected tab has tabindex 0, the others -1", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("tabindex", "-1");
  });

  it("selects on click and reports the value", () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    fireEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(onValueChange).toHaveBeenCalledWith("two");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
    expect(screen.queryByText("Panel one")).toBeNull();
  });

  it("automatic activation: Arrow keys move focus and select, skipping disabled tabs", () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    const one = screen.getByRole("tab", { name: "One" });
    const two = screen.getByRole("tab", { name: "Two" });

    one.focus();
    keyDown("ArrowRight");
    expect(two).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("two");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");

    // Three is disabled, so the next tab wraps to One.
    keyDown("ArrowRight");
    expect(one).toHaveFocus();
    keyDown("End");
    expect(two).toHaveFocus();
    keyDown("Home");
    expect(one).toHaveFocus();
  });

  it("manual activation: Arrow keys only move focus; Enter / Space select", () => {
    const onValueChange = vi.fn();
    renderTabs({ activation: "manual", onValueChange });
    const one = screen.getByRole("tab", { name: "One" });
    const two = screen.getByRole("tab", { name: "Two" });

    one.focus();
    keyDown("ArrowRight");
    expect(two).toHaveFocus();
    expect(onValueChange).not.toHaveBeenCalled();
    expect(one).toHaveAttribute("aria-selected", "true");

    keyDown("Enter");
    expect(onValueChange).toHaveBeenCalledWith("two");
    expect(two).toHaveAttribute("aria-selected", "true");
  });

  it("vertical orientation uses Up/Down", () => {
    renderTabs({ orientation: "vertical" });
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
    const one = screen.getByRole("tab", { name: "One" });
    one.focus();
    keyDown("ArrowDown");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    keyDown("ArrowRight");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
  });

  it("follows a controlled value and snaps back when the parent ignores a change", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Tabs value="one" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );
    fireEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(onValueChange).toHaveBeenCalledWith("two");
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");

    rerender(
      <Tabs value="two" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });

  it("keeps hidden panels mounted with forceMount and maps variant/size classes", () => {
    render(
      <Tabs defaultValue="one" variant="pills" size="sm">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two" forceMount>
          Panel two
        </TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toHaveClass("mild-tabs-list--pills", "mild-tabs-list--sm");
    expect(screen.getByRole("tab", { name: "One" })).toHaveClass("mild-tabs-trigger--sm");
    const hidden = screen.getByText("Panel two");
    expect(hidden).not.toBeVisible();
    expect(hidden).toHaveAttribute("hidden");
    expect(screen.getByRole("tabpanel")).toHaveClass("mild-tabs-content--sm");
  });

  it("throws a helpful error when a part is used outside Tabs", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TabsTrigger value="x">x</TabsTrigger>)).toThrow("inside <Tabs>");
    error.mockRestore();
  });
});
