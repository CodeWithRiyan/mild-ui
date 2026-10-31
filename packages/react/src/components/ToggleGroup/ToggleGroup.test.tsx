import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

function renderGroup(props: React.ComponentProps<typeof ToggleGroup> = {}) {
  return render(
    <ToggleGroup aria-label="Format" {...props}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>,
  );
}

const pressed = () =>
  screen.getAllByRole("button").map((button) => button.getAttribute("aria-pressed"));

describe("ToggleGroup", () => {
  it("renders a group of toggles with one tab stop and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderGroup({ ref } as React.ComponentProps<typeof ToggleGroup>);
    const group = screen.getByRole("group", { name: "Format" });
    expect(ref.current).toBe(group);
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((button) => button.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
    expect(buttons[0]).toHaveAttribute("data-value", "bold");
  });

  it("single: presses one at a time, deselects on a second press, reports string | null", () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });
    fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(pressed()).toEqual(["true", "false", "false"]);
    expect(onValueChange).toHaveBeenLastCalledWith("bold");

    fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(pressed()).toEqual(["false", "true", "false"]);
    expect(onValueChange).toHaveBeenLastCalledWith("italic");

    fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(pressed()).toEqual(["false", "false", "false"]);
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("multiple: toggles independently and reports an array", () => {
    const onValueChange = vi.fn();
    renderGroup({ type: "multiple", defaultValue: ["bold"], onValueChange });
    fireEvent.click(screen.getByRole("button", { name: "Underline" }));
    expect(pressed()).toEqual(["true", "false", "true"]);
    expect(onValueChange).toHaveBeenLastCalledWith(["bold", "underline"]);

    fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["underline"]);
  });

  it("follows a controlled value and snaps back when the parent ignores a change", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <ToggleGroup value="bold" onValueChange={onValueChange}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(onValueChange).toHaveBeenCalledWith("italic");
    expect(pressed()).toEqual(["true", "false"]);

    rerender(
      <ToggleGroup value="italic" onValueChange={onValueChange}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(pressed()).toEqual(["false", "true"]);
  });

  it("moves focus with the Arrow keys without pressing", () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });
    const bold = screen.getByRole("button", { name: "Bold" });
    bold.focus();
    fireEvent.keyDown(bold, { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Italic" }));
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "End" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Underline" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("disables every item when the group is disabled", () => {
    const onValueChange = vi.fn();
    renderGroup({ disabled: true, onValueChange });
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("requires items to be inside a group", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ToggleGroupItem value="x">x</ToggleGroupItem>)).toThrow(
      /inside <ToggleGroup>/,
    );
    error.mockRestore();
  });
});
