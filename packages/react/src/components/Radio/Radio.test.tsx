import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup, RadioGroupItem } from "./Radio";

const items = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Bravo" },
  { value: "c", label: "Charlie" },
];

function tabIndexes(): string[] {
  return screen.getAllByRole("radio").map((radio) => radio.getAttribute("tabindex") ?? "");
}

describe("Radio (driven by @mild-ui/primitives/radio-group)", () => {
  it("renders a radiogroup whose checked radio is the single tab stop", () => {
    render(<Radio items={items} defaultValue="b" />);

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Bravo" })).toHaveAttribute("aria-checked", "true");
    expect(tabIndexes()).toEqual(["-1", "0", "-1"]);
  });

  it("makes the first radio the tab stop when nothing is checked", () => {
    render(<Radio items={items} />);

    expect(tabIndexes()).toEqual(["0", "-1", "-1"]);
  });

  it("checks on click and reports the value", () => {
    const onValueChange = vi.fn();
    render(<Radio items={items} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));

    expect(onValueChange).toHaveBeenCalledWith("c");
    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("data-state", "checked");
    expect(tabIndexes()).toEqual(["-1", "-1", "0"]);
  });

  it("moves and checks with the arrow keys, wrapping at the end", () => {
    const onValueChange = vi.fn();
    render(<Radio items={items} defaultValue="a" onValueChange={onValueChange} />);
    const group = screen.getByRole("radiogroup");

    screen.getByRole("radio", { name: "Alpha" }).focus();
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(onValueChange).toHaveBeenLastCalledWith("b");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Bravo" }));

    fireEvent.keyDown(group, { key: "ArrowDown" });
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(onValueChange).toHaveBeenLastCalledWith("a");
  });

  it("skips disabled radios", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup defaultValue="a" onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="Alpha" />
        <RadioGroupItem value="b" label="Bravo" disabled />
        <RadioGroupItem value="c" label="Charlie" />
      </RadioGroup>,
    );

    screen.getByRole("radio", { name: "Alpha" }).focus();
    fireEvent.keyDown(screen.getByRole("radiogroup"), { key: "ArrowDown" });

    expect(onValueChange).toHaveBeenLastCalledWith("c");
    fireEvent.click(screen.getByRole("radio", { name: "Bravo" }));
    expect(onValueChange).not.toHaveBeenCalledWith("b");
  });

  it("follows the controlled value", () => {
    const { rerender } = render(<Radio items={items} value="a" />);

    fireEvent.click(screen.getByRole("radio", { name: "Bravo" }));
    expect(screen.getByRole("radio", { name: "Alpha" })).toHaveAttribute("aria-checked", "true");

    rerender(<Radio items={items} value="c" />);
    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("aria-checked", "true");
    expect(tabIndexes()).toEqual(["-1", "-1", "0"]);
  });

  it("picks up radios added after mount", () => {
    const { rerender } = render(<Radio items={items.slice(0, 2)} />);
    rerender(<Radio items={items} />);

    fireEvent.click(screen.getByRole("radio", { name: "Charlie" }));

    expect(screen.getByRole("radio", { name: "Charlie" })).toHaveAttribute("aria-checked", "true");
  });

  it("shows the default dot, or the indicator passed in", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" label="Alpha" indicator={<span data-testid="custom" />} />
        <RadioGroupItem value="b" label="Bravo" />
      </RadioGroup>,
    );

    expect(screen.getByTestId("custom")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: "Bravo" }));
    expect(screen.getByRole("radio", { name: "Bravo" }).querySelector("svg")).not.toBeNull();
  });

  it("submits the value through a hidden input when given a name", () => {
    const { container } = render(<Radio items={items} name="letter" defaultValue="b" />);

    expect(container.querySelector<HTMLInputElement>('input[name="letter"]')?.value).toBe("b");
  });
});
