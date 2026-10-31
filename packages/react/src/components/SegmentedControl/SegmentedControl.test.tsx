import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("SegmentedControl", () => {
  it("renders a radiogroup of buttons and forwards its ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SegmentedControl ref={ref} items={items} aria-label="Range" />);
    const group = screen.getByRole("radiogroup", { name: "Range" });
    expect(ref.current).toBe(group);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(radios.every((radio) => radio.tagName === "BUTTON")).toBe(true);
    // Nothing checked: the first segment is the tab stop.
    expect(radios.map((radio) => radio.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
  });

  it("selects on click (uncontrolled) and reports the value", () => {
    const onValueChange = vi.fn();
    render(<SegmentedControl items={items} defaultValue="day" onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("radio", { name: "Week" }));
    expect(onValueChange).toHaveBeenCalledWith("week");
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("aria-checked", "false");
  });

  it("follows the controlled value and snaps back when the parent ignores a change", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <SegmentedControl items={items} value="day" onValueChange={onValueChange} />,
    );
    fireEvent.click(screen.getByRole("radio", { name: "Month" }));
    expect(onValueChange).toHaveBeenCalledWith("month");
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute("aria-checked", "false");

    rerender(<SegmentedControl items={items} value="month" onValueChange={onValueChange} />);
    expect(screen.getByRole("radio", { name: "Month" })).toHaveAttribute("aria-checked", "true");
  });

  it("moves and selects with the Arrow keys", () => {
    const onValueChange = vi.fn();
    render(<SegmentedControl items={items} defaultValue="day" onValueChange={onValueChange} />);
    const day = screen.getByRole("radio", { name: "Day" });
    day.focus();
    fireEvent.keyDown(day, { key: "ArrowRight" });
    expect(onValueChange).toHaveBeenLastCalledWith("week");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Week" }));
  });

  it("never selects a disabled segment", () => {
    const onValueChange = vi.fn();
    render(
      <SegmentedControl
        items={[...items, { value: "year", label: "Year", disabled: true }]}
        onValueChange={onValueChange}
      />,
    );
    const year = screen.getByRole("radio", { name: "Year" });
    expect(year).toBeDisabled();
    fireEvent.click(year);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("submits through a hidden input that follows the value", () => {
    const { container } = render(
      <SegmentedControl items={items} name="range" defaultValue="day" />,
    );
    const hidden = container.querySelector<HTMLInputElement>("input[name='range']");
    expect(hidden).toHaveValue("day");
    fireEvent.click(screen.getByRole("radio", { name: "Month" }));
    expect(hidden).toHaveValue("month");
  });
});
