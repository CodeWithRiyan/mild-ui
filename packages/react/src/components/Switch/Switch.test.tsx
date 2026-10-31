import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch (driven by @mild-ui/primitives/switch)", () => {
  it("renders an off, focusable switch with its label", () => {
    render(<Switch id="wifi" label="Wi-Fi" />);
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });

    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle).toHaveAttribute("tabindex", "0");
    expect(toggle).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click, Space and Enter", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole("switch");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);

    fireEvent.keyDown(toggle, { key: " " });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    fireEvent.keyDown(toggle, { key: "Enter" });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledTimes(3);
  });

  it("follows the controlled prop", () => {
    const { rerender } = render(<Switch checked={false} />);
    const toggle = screen.getByRole("switch");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");

    rerender(<Switch checked />);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAttribute("data-state", "checked");
  });

  it("ignores interaction while disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);
    const toggle = screen.getByRole("switch");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-disabled", "true");
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("renders a thumb icon when given one", () => {
    render(<Switch thumbIcon={<span data-testid="thumb-icon" />} />);
    expect(screen.getByTestId("thumb-icon")).toBeInTheDocument();
  });

  it("submits through a hidden input when given a name", () => {
    const { container } = render(<Switch name="wifi" defaultChecked />);
    const input = container.querySelector<HTMLInputElement>('input[name="wifi"]');

    expect(input?.checked).toBe(true);
  });
});
